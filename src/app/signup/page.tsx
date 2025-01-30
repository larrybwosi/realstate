import { BackgroundImage } from '@/components/BackgroundImage';
import { SignUpForm } from '@/components/SignUpForm';

export default function SignUpPage() {

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 duration-300">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <BackgroundImage />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center p-6">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to ApartmentFinder
            </h1>
            <p className="text-xl mb-8">
              Find your perfect home or tenant today!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Sign Up
          </h2>
          <SignUpForm />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

