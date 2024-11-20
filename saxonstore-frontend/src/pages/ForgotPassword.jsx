import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { forgotPassword } from "../services/userService";
import { toast } from "../hooks/use-toast";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(data.email);
      if (response.data.httpCode === 500) {
        toast({
          description: response.data.message,
          className: "border rounded-lg p-4 border-red-500",
        });
      } else {
        toast({
          description: response.data,
          className: "border rounded-lg p-4 border-green-500",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        description: "An unexpected error occurred. Please try again.",
        className: "border rounded-lg p-4",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4">
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

            {isLoading ? (
              <div className="flex justify-center p-5">
                <SyncLoader size={8} />
              </div>
            ) : (
              <button
                type="submit"
                className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
              >
                Send Password Reset Link
              </button>
            )}

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Remember your password?{" "}
                <span
                  onClick={() => navigate("/sign-in")}
                  className="cursor-pointer font-bold text-black hover:underline"
                >
                  Log In here
                </span>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
