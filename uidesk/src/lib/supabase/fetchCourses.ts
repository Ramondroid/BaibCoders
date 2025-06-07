import { supabase } from './supabase';

export async function fetchCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}