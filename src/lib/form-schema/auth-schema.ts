import {z} from 'zod'

export const signInFormSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})
export const signUpFormSchema = z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6),
    confirmPassword:z.string().min(6)
}).refine((data)=>data.password === data.confirmPassword,{
    message:"password don't match",
    path:['confirmPassword']
})