import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
function SignUp() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-8 flex min-h-screen items-center justify-center bg-white p-8 pt-16">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-4 sm:p-12 lg:max-w-lg">
        <h2 className="mb-6 text-center text-2xl font-normal">
          CREATE AN ACCOUNT
        </h2>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormControl>
                    <input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.firstName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormControl>
                    <input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.lastName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center rounded-l-lg border border-gray-300 bg-gray-100 px-4">
                        +94
                      </div>

                      <input
                        {...field}
                        id="phone"
                        placeholder="Enter your phone number"
                        className="h-12 w-full rounded-r-lg border border-l-0 border-gray-300 px-4 text-base focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.confirmPassword?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="pt-3">
              <button
                type="submit"
                className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
              >
                Sign Up
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="font-bold text-black hover:underline"
                >
                  Log in here
                </a>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
