import { Link } from "react-router-dom";
import { Users, BookOpen, Shield, Zap } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <div className="text-center py-8 sm:py-12 md:py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-4 sm:mb-6 shadow-lg">
          <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
          Welcome to <span className="text-blue-600">AddressBook</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Modern contact management built with React. Organize, manage, and access your contacts with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/contacts"
            className="py-2 px-6 sm:py-3 sm:px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            View Contacts
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Management</h3>
          <p className="text-gray-600">
            Add, edit, and delete contacts with an intuitive interface designed for efficiency.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
          <p className="text-gray-600">
            Your contact data is stored securely with authentication and protected routes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Responsive</h3>
          <p className="text-gray-600">
            Built with modern React and optimized for performance across all devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
