function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-normal">
          FORGOT PASSWORD
        </h2>

        <form className="space-y-6">
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

          <button
            type="submit"
            className="h-12 w-full rounded-l border border-gray-900 bg-white text-xl font-normal text-black transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          >
            Send OTP
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Remember your password?{" "}
              <a
                href="/sign-in"
                className="font-bold text-black hover:underline"
              >
                Log In here
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
