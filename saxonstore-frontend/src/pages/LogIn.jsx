import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { login } from "../services/userService";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../features/userSlice";
import { SyncLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { showToast } from "../lib/toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

function LogIn() {
  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      const { data: token } = response.data;

      const decodedToken = jwtDecode(token);
      dispatch(loginAction({ user: decodedToken, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
      showToast({
        type: "error",
        description:
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-20 mt-36 flex w-full max-w-7xl items-center justify-center">
      <div className="w-[500px] rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-6 text-center text-2xl font-normal">LOG IN</h2>

        <Form {...control}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className="cursor-pointer text-right text-sm text-black hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </div>

            {isLoading ? (
              <div className="flex justify-center p-5">
                <SyncLoader size={8} />
              </div>
            ) : (
              <button
                type="submit"
                className="h-12 w-full rounded-lg border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
              >
                Log In
              </button>
            )}

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <span
                  className="cursor-pointer font-bold text-black hover:underline"
                  onClick={() => navigate("/sign-up")}
                >
                  Register here
                </span>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LogIn;
