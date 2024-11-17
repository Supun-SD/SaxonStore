import { useForm } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

const contactUsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{9}$/, "Phone number must be 9 digits")
    .optional(),
  message: z.string().min(1, "Message is required"),
});

function ContactUs() {
  const form = useForm({
    resolver: zodResolver(contactUsSchema), 
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Contact Us form data:", data);
      // Example API call to send the data to backend
      const response = await fetch("/api/contact-us");

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      console.log("Message sent successfully!");
      alert("Your message has been sent.");
      // Optionally reset the form here
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("There was an issue submitting the form. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-8 text-center text-2xl font-normal">CONTACT US</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your full name"
                      className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
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

            {/* Message */}
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows="4"
                      placeholder="Write your message here"
                      className="h-32 w-full resize-none rounded-lg border px-4 py-3 focus:outline-none focus:ring-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
              >
                Send Message
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ContactUs;
