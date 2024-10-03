"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { signInFormSchema, signUpFormSchema } from "../form-schema/auth-schema";
import { redirect } from "next/navigation";
export async function login({
  email,
  password,
}: z.infer<typeof signInFormSchema>) {
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  return data;
}

export async function signup(formData: z.infer<typeof signInFormSchema>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp(formData);
  

  if (error) {
    return { error: error.message };
  }
  return {user:data.user}
}
