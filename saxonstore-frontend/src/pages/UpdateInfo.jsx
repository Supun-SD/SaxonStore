import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

function UpdateInfo() {
  const form = useForm();
  const { handleSubmit, control, setValue } = form; // `setValue` allows you to set the form values programmatically
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /*useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile"); // Replace with your actual API endpoint
        const profileData = response.data;

        // Set the fetched data into the form fields
        setValue("firstName", profileData.firstName);
        setValue("lastName", profileData.lastName);
        setValue("address", profileData.address);
        setValue("city", profileData.city);
        setValue("postalCode", profileData.postalCode);
        setValue("phone", profileData.phone);

        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error("Error fetching profile data", err);
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [setValue]);*/

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Send the updated data to the backend
      const response = await axios.put("/api/user/profile", data); // Replace with your actual API endpoint
      console.log("Updated Address Information:", response.data);

      setLoading(false);
      // Optionally, handle the success, such as showing a success message
    } catch (err) {
      console.error("Error updating profile data", err);
      setError("Failed to update profile.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-8 text-center text-2xl">UPDATE ADDRESS</h2>
        <Form {...control}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name and Last Name */}
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

            {/* Address */}
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

            {/* City and Postal Code */}
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

            {/* Phone */}
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

            {/* Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                className="h-12 w-1/3 rounded-l border text-lg font-medium text-black transition hover:bg-gray-200"
                onClick={() => navigate("/my-account")}
              >
                Back
              </button>
              <button
                type="submit"
                className="h-12 w-1/3 rounded-l border border-gray-900 bg-white text-lg font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
              >
                Update
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateInfo;
