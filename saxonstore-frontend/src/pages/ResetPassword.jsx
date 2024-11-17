import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// Define validation schema using Zod
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ResetPassword() {
  // Initialize form methods
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Form submit handler
  const onSubmit = (data) => {
    console.log("Password reset data:", data);
    // Logic to handle password reset goes here
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-normal">
          RESET PASSWORD
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password Field */}
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      id="newPassword"
                      placeholder="Enter new password"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.newPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
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
                      placeholder="Confirm your new password"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
            >
              Reset Password
            </button>

            {/* Link to Sign In */}
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Remembered your password?{" "}
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

export default ResetPassword;
