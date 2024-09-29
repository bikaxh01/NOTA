"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signInFormData } from "@/lib/form-schema/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/cypresslogo.svg";
import Template from "../Template";
import Loader from "@/components/global/loader";
import { login } from "@/lib/server-actions/signIn-action";
function SignInPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof signInFormData>>({
    resolver: zodResolver(signInFormData),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof signInFormData>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    //@ts-ignore
    const { error } = await login(values);

    if (error) {
      form.reset();
      setSubmitError(error);
    }
    router.replace("/dashboard");
  };

  return (
    <Template>
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) {
              setSubmitError("");
            }
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
        >
          <Link href={"/"} className=" w-full justify-left flex items-center">
            <Image src={Logo} alt="Logo" width={50} height={50} />
            <span className=" font-semibold dark:text-white text-4xl first-letter:ml-2">
              Nota.com
            </span>
          </Link>
          <FormDescription className=" text-foreground/60">
            An all-In-One Collaboration and Productivity Platform
          </FormDescription>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type="submit"
            className=" w-full p-6 hover:bg-purple-500 "
            size="lg"
            disabled={isLoading}
          >
            {!isLoading ? "Sign Up" : <Loader />}
          </Button>
          <span className=" self-container">
            Dont have account?{" "}
            <Link href={"/sign-up"} className=" text-primary underline">
              Click Here
            </Link>
          </span>
        </form>
      </Form>
    </Template>
  );
}

export default SignInPage;
