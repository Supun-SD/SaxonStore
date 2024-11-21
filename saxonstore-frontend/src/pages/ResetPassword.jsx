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
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/userService";
import { useState } from "react";
import { showToast } from "../lib/toast";
import { SyncLoader } from "react-spinners";

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
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const reqData = {
        token: token,
        newPassword: data.newPassword,
      };
      console.log(reqData);
      await resetPassword(data);
      showToast({
        type: "success",
        description: "Your password has been resetted successfully",
      });
      navigate("/log-in");
    } catch (error) {
      console.log(error);
      showToast({
        type: "error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-normal">
          RESET PASSWORD
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            {isLoading ? (
              <div className="flex justify-center p-5">
                <SyncLoader size={8} />
              </div>
            ) : (
              <button
                type="submit"
                className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
              >
                Reset Password
              </button>
            )}

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
