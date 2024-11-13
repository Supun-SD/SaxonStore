function UpdateInfo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-8 text-center text-2xl">UPDATE ADDRESS</h2>

        <form className="space-y-6">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="mb-2 block text-lg font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="mb-2 block text-lg font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="mb-2 block text-lg font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
            />
          </div>

          {/* City and Postal Code */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="city" className="mb-2 block text-lg font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="City"
                className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="postalCode"
                className="mb-2 block text-lg font-medium"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                placeholder="Postal Code"
                className="h-12 w-full rounded-lg border px-4 focus:outline-none focus:ring-1"
              />
            </div>
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

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              className="h-12 w-1/3 rounded-l border text-lg font-medium text-black transition hover:bg-gray-200"
            >
              <a href="my-account">Back</a>
            </button>
            <button
              type="submit"
              className="h-12 w-1/3 rounded-l border border-gray-900 bg-white text-lg font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateInfo;
