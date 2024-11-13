function SignUp() {
  return (
    <div className="mt-8 flex min-h-screen items-center justify-center bg-white p-8 pt-16">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-4 sm:p-12 lg:max-w-lg">
        <h2 className="mb-6 text-center text-2xl font-normal">
          CREATE AN ACCOUNT
        </h2>

        <form className="flex flex-col space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-lg font-normal"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-lg font-normal"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-lg font-normal">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
            />
          </div>

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

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-lg font-normal"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-lg font-normal"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base focus:outline-none"
            />
          </div>

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
      </div>
    </div>
  );
}

export default SignUp;
