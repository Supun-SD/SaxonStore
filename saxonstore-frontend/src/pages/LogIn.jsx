function LogIn() {
  return (
    <div className="flex-center h-screen justify-center">
      <div className="mb-8 w-[500px] rounded-2xl border-2 border-gray-300 bg-white p-8">
        <h2 className="mb-6 text-center text-2xl font-normal">LOG IN</h2>

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
      </div>
    </div>
  );
}

export default LogIn;
