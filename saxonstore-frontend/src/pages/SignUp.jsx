import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "../hooks/use-toast";
import { SyncLoader } from "react-spinners";
import { register as registerAction } from "../services/userService";
import { useState } from "react";

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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerAction({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "CUSTOMER",
        phone: data.phone,
        username: `${data.firstName}${data.lastName.charAt(0)}`,
      });
      navigate("/sign-in");
    } catch (error) {
      const statusCode = error.response?.status;

      toast({
        description:
          statusCode === 400
            ? "User already exists"
            : "An unexpected error occurred. Please try again.",
        className: `border rounded-lg p-4 ${
          statusCode === 400 ? "border-red-500" : "border-yellow-500"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-24 flex min-h-screen items-center justify-center bg-white p-8 pt-16">
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
            {isLoading ? (
              <div className="flex justify-center p-5">
                <SyncLoader size={8} />
              </div>
            ) : (
              <div className="pt-3">
                <button
                  type="submit"
                  className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/sign-in")}
                  className="cursor-pointer font-bold text-black hover:underline"
                >
                  Log in here
                </span>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
