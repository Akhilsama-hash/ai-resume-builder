import { FiCpu } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <FiCpu className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                AI Resume Builder
              </h1>
              <p className="text-xs text-gray-500">Hackathon Edition</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm text-gray-600">
              Powered by AI
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
