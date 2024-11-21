import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { update } from "../services/userService";
import { updateUser as updateAction } from "../features/userSlice";
import { showToast } from "../lib/toast";
import { useState } from "react";

function UpdateInfo() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const form = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      phone: user.phone,
    },
  });
  const { control } = form;
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await update(data, user.userId, token);
      dispatch(updateAction(data));
      showToast({
        type: "success",
        description: "User info updated successfully",
      });
    } catch (error) {
      const statusCode = error.response?.status;

      if (statusCode === 400) {
        showToast({
          type: "error",
          description: "User doesn't exists",
        });
      } else {
        showToast({
          type: "error",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-20 mt-36 flex w-full max-w-7xl items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-8 text-center text-2xl">UPDATE ADDRESS</h2>
        <Form {...control}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-4">
              <FormField
                name="firstName"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="First Name"
                        className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="Last Name"
                        className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="address"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Address"
                      className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                name="city"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="City"
                        className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="Postal Code"
                        className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="phone"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="flex overflow-hidden rounded-lg border border-gray-300">
                      <div className="flex items-center justify-center border-r px-3 pr-4">
                        +94
                      </div>
                      <input
                        {...field}
                        type="tel"
                        placeholder="Phone Number"
                        className="h-12 w-full px-4 focus:outline-none"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                className="h-12 w-1/3 rounded-l border text-lg font-medium text-black transition hover:bg-gray-200"
                onClick={() => navigate("/my-account")}
              >
                Back
              </button>
              {isLoading ? (
                <div className="flex justify-center p-5">
                  <SyncLoader size={8} />
                </div>
              ) : (
                <button
                  type="submit"
                  className="h-12 w-1/3 border border-gray-900 bg-white text-lg font-normal text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateInfo;
