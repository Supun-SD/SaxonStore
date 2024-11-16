import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .regex(/^\d{9}$/, "Phone number must be 9 digits")
      .optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

function SignUp() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/register", data);
      console.log("Signup successful:", response.data);
      alert("Account created successfully!");
      navigate("/sign-in");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed.");
    }
  };

  return (
    <div className="mt-8 flex min-h-screen items-center justify-center bg-white p-8 pt-16">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-4 sm:p-12 lg:max-w-lg">
        <h2 className="mb-6 text-center text-2xl font-normal">
          CREATE AN ACCOUNT
        </h2>

        <Form {...control}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormField
              name="firstName"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormControl>
                    <input
                      id="firstName"
                      {...register("firstName")}
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
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormControl>
                    <input
                      id="lastName"
                      placeholder="Enter your last name"
                      {...register("lastName")}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.lastName?.message}</FormMessage>
                </FormItem>
              )}
            />

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
                      type="email"
                      {...register("email")}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <FormControl>
                    <div className="flex overflow-hidden rounded-lg border border-gray-300">
                      <div className="flex items-center justify-center border-r px-3 pr-4">
                        +94
                      </div>
                      <input
                        id="phone"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                        className="h-12 w-full px-4 text-base focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base"
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
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
