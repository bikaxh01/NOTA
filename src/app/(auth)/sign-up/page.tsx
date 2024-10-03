"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

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
import {
  signUpFormSchema,
  signInFormSchema,
} from "@/lib/form-schema/auth-schema";
import clsx from "clsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { signup } from "@/lib/server-actions/auth-actions";

function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyling = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);

    //@ts-ignore
    const { error,user } = await signup(values);

    if (error) {
      form.reset();
      setSubmitError(error);
    }

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
          {!confirmation && !codeExchangeError && (
            <>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className=" p-6 w-full">
                {!isLoading ? "Create Account" : <Loader />}
              </Button>
            </>
          )}

          {submitError && <FormMessage>{submitError}</FormMessage>}
          <span className=" self-container">
            Already have account?{" "}
            <Link href={"/sign-in"} className=" text-primary underline">
              Click Here
            </Link>
          </span>
          {(confirmation || codeExchangeError) && (
            <>
              <>
                <Alert className={confirmationAndErrorStyling}>
                  {!codeExchangeError && <MailCheck className="h-4 w-4" />}
                  <AlertTitle>
                    {codeExchangeError ? "Invalid Link" : "Check your email"}
                  </AlertTitle>
                  <AlertDescription>
                    {codeExchangeError || "An email confirmation has been sent"}
                  </AlertDescription>
                </Alert>
              </>
            </>
          )}
        </form>
      </Form>
    </Template>
  );
}

export default SignUpPage;
