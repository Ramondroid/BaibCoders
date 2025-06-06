"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Logging in with data:", data);

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );

  console.log('Login success:', authData)
  console.log('Login error:', error)

  if (error || !authData.user) {
    redirect("/error");
  }

  const role = authData.user.user_metadata?.role;

  revalidatePath("/", "layout");
  if (role === "student") {
    redirect("/student/dashboard");
  } else if (role === "teacher") {
    redirect("/teacher/dashboard");
  } else {
    redirect("/");
  }
}
