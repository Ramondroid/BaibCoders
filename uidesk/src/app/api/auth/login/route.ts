"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error || !authData.user) {
    console.error("Login failed:", error?.message);
    redirect("/error");
  }

  const userEmail = authData.user.email;

  const { data: userRecord, error: roleError } = await supabase
    .from("users")
    .select("role")
    // TODO Fix this to use userid instead of email 
    // This is a temporary fix, ideally we should use the user ID
    // .eq("id", userId)
    .eq("email", userEmail)
    .single();

  if (roleError || !userRecord) {
    console.error("Role lookup failed:", roleError?.message);
    redirect("/error");
  }

  const role = userRecord.role;

  revalidatePath("/", "layout");

  if (role === "student") {
    redirect("/student/dashboard");
  } else if (role === "teacher") {
    redirect("/teacher/dashboard");
  } else {
    redirect("/");
  }
}
