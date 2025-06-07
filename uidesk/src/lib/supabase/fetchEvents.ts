// lib/supabase/fetchEvents.ts
import { supabase } from '@/lib/supabase/supabase';

export const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
