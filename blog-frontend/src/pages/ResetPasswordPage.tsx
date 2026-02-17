import { useState } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';

function ResetPasswordPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-red-50 flex flex-col">
      <header className="bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transform rotate-12">
              <div className="w-5 h-5 bg-white rounded-sm transform -rotate-12"></div>
            </div>
            <span className="text-xl font-semibold">BlogPlatform</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <RotateCcw className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Reset your password</h1>
            <p className="text-gray-600 text-center">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Send reset link
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2023 BlogPlatform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ResetPasswordPage;
