"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { signIn } from "@/lib/authClient";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

type ValidationErrors = {
  email?: string;
  password?: string;
};

export default function SigninForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password cannot exceed 100 characters"),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = await schema.parseAsync(formData);
      console.log("Validated data:", validatedData);
      
      await signIn.email({
        email: validatedData.email,
        password: validatedData.password,
        rememberMe: true,
      })

      // Add your submission logic here
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, curr) => {
          const key = curr.path[0];
          return { ...acc, [key]: curr.message };
        }, {} as ValidationErrors);
        setValidationErrors(errors);
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl p-8 shadow-xl bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
      <header className="text-center mb-8">
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-2">
          Welcome Back
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Login to your account
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="user@cheapcity.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className={cn(
                "text-xs text-red-500",
                validationErrors.password ? "visible" : "invisible"
              )}
            >
              {validationErrors.password}
            </span>
          </LabelInputContainer>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-6">
            <a
              href="#"
              className="underline-offset-4 hover:underline text-neutral-800 dark:text-neutral-100"
            >
              Forgot password?
            </a>
          </p>

          <LabelInputContainer>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="underline-offset-4 hover:underline text-neutral-800 dark:text-neutral-100"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline-offset-4 hover:underline text-neutral-800 dark:text-neutral-100"
              >
                Privacy Policy
              </a>
              .
            </p>
            {validationErrors.email && (
              <span className="text-xs text-red-500">
                {validationErrors.email}
              </span>
            )}
          </LabelInputContainer>
        </div>

        <button
          className="relative group/btn w-full bg-linear-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 rounded-md h-10 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] transition-all duration-200 hover:scale-[1.02]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <SocialButton
            icon={IconBrandGithub}
            text="GitHub"
            onClick={() => signIn.social({ provider: "github",callbackURL:'/' })}
          />
          <SocialButton
            icon={IconBrandGoogle}
            text="Google"
            onClick={() => signIn.social({ provider: "google",callbackURL:'/' })}
          />
          <SocialButton
            icon={IconBrandOnlyfans}
            text="OnlyFans"
            onClick={() =>
              toast({
                title: "Coming Soon",
                description: "OnlyFans is currently in development.",
                variant: "destructive",
              })
            }
          />
        </div>
      </form>

      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-6">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="underline-offset-4 hover:underline text-neutral-800 dark:text-neutral-100"
        >
          Sign Up
        </a>
        .
      </p>
    </div>
  );
}

const SocialButton = ({
  icon: Icon,
  text,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 shadow-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 border border-neutral-200 dark:border-neutral-800"
    
  >
    <Icon className="h-4 w-4" />
    <span>{text}</span>
  </button>
);

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-xs block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
    {children}
  </div>
);
