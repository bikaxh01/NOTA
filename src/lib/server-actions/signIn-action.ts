"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { signInFormData } from "../form-schema/sign-in";
import { redirect } from 'next/navigation'
export async function login({
  email,
  password,
}: z.infer<typeof signInFormData>) {
  const supabase = createClient();

  const { error,data } = await supabase.auth.signInWithPassword({ email, password });
  

  if(error){
    return{ error: error.message}
  }
  return data
};

  


// export async function signup(formData: FormData) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
//}
