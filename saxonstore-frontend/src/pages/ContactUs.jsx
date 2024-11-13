function ContactUs() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-8 text-center text-2xl font-normal">CONTACT US</h2>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-lg font-medium">
              Phone
            </label>
            <div className="flex">
              <span className="flex items-center rounded-l-lg border px-4">
                +94
              </span>
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                className="h-12 w-full rounded-r-lg border border-l-0 px-4 focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-2 block text-lg font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Write your message here"
              className="w-full resize-none rounded-lg border px-4 py-3 focus:outline-none focus:ring-1"
            ></textarea>
          </div>

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
      </div>
    </div>
  );
}

export default ContactUs;
