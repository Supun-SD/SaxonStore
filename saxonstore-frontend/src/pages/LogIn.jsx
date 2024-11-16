import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
function LogIn() {
  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post();
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="flex-center h-screen justify-center">
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
                  <FormControl asChild>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", { required: true })}
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
                  <FormControl asChild>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-2 text-right">
              <a
                href="/Forgot-Password"
                className="text-sm text-black hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
            >
              Log In
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/Sign-Up"
                  className="font-bold text-black hover:underline"
                >
                  Register here
                </a>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LogIn;
