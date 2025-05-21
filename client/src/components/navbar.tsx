import { useState } from 'react';
import { Database, Menu, X, Github, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">dpop</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#generator"
                  className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Generator
                </a>
                <a
                  href="#works"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  How It Works
                </a>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
                  >
                    Examples
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          User Management
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          E-commerce
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Blog System
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Inventory System
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center">
            <a
              href="https://github.com/shubhamkumaar/dpop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white ml-4 flex items-center"
            >
              <Github className="h-6 w-6" />
              <span className="ml-2 text-sm">Star on GitHub</span>
            </a>
            <div className="ml-4 flex-shrink-0">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-400 bg-gray-800 hover:bg-gray-700 focus:outline-none"
                  >
                    Student Project
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Generator
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              How It Works
            </a>
            <button
              onClick={() => {}} // Toggle examples dropdown in mobile view
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Examples
            </button>
            <div className="pl-4">
              <a
                href="#"
                className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
              >
                User Management
              </a>
              <a
                href="#"
                className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
              >
                E-commerce
              </a>
              <a
                href="#"
                className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
              >
                Blog System
              </a>
              <a
                href="#"
                className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
              >
                Inventory System
              </a>
            </div>
          </div>
          <div className="px-5 pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center">
              <a
                href="https://github.com/yourusername/sql-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <Github className="h-6 w-6" />
                <span className="ml-2 text-sm">Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
