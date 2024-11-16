import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function ForgotPassword() {
  const navigate = useNavigate();
  // Initialize form methods
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  // Form submit handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("", {
        email: data.email,
      });

      // Handle success response
      if (response.status === 200) {
        console.log("Password reset link sent:", response.data);
        alert("Password reset link has been sent to your email address.");
        reset(); // Reset the form fields
        navigate("/sign-in"); // Redirect to login page
      }
    } catch (error) {
      // Handle error
      console.error("Error sending password reset link:", error);
      alert(
        error.response?.data?.message || "Failed to send password reset link.",
      );
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-normal">
          FORGOT PASSWORD
        </h2>

        <Form {...control}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.email && errors.email.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
            >
              Send Password Reset Link
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Remember your password?{" "}
                <a
                  href="/sign-in"
                  className="font-bold text-black hover:underline"
                >
                  Log In here
                </a>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
