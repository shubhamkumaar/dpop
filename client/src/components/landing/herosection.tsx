export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="text-blue-400 font-semibold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
              SQL DUMMY GENERATOR
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Generate SQL Test Data{" "}
              <span className="text-blue-500">With Just A Few Clicks</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-lg mb-8">
              The simple, powerful tool for developers and testers who need
              realistic SQL data - fast and hassle-free.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Generate SQL Now
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200 border border-gray-700 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                View Documentation
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Code editor mockup */}
              <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
                {/* Editor header */}
                <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto text-sm text-gray-400">
                    sql_generator.sql
                  </div>
                </div>

                {/* Code content */}
                <div className="p-4 font-mono text-sm">
                  <div className="text-blue-400">
                    INSERT INTO <span className="text-green-400">users</span>{" "}
                    (id, name, email, created_at) VALUES
                  </div>
                  <div className="pl-4 text-gray-300">
                    (1, <span className="text-yellow-300">'John Smith'</span>,{" "}
                    <span className="text-yellow-300">'john@example.com'</span>,{" "}
                    <span className="text-yellow-300">'2025-05-18'</span>),
                  </div>
                  <div className="pl-4 text-gray-300">
                    (2, <span className="text-yellow-300">'Emma Johnson'</span>,{" "}
                    <span className="text-yellow-300">'emma@example.com'</span>,{" "}
                    <span className="text-yellow-300">'2025-05-17'</span>),
                  </div>
                  <div className="pl-4 text-gray-300">
                    (3, <span className="text-yellow-300">'Michael Brown'</span>
                    ,{" "}
                    <span className="text-yellow-300">
                      'michael@example.com'
                    </span>
                    , <span className="text-yellow-300">'2025-05-16'</span>),
                  </div>
                  <div className="pl-4 text-gray-300">
                    (4, <span className="text-yellow-300">'Sarah Davis'</span>,{" "}
                    <span className="text-yellow-300">'sarah@example.com'</span>
                    , <span className="text-yellow-300">'2025-05-15'</span>),
                  </div>
                  <div className="text-gray-500">-- 96 more rows</div>
                </div>
              </div>

              {/* Decoration */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 bg-opacity-20 rounded-lg blur-2xl z-0"></div>

              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500 bg-opacity-20 rounded-lg blur-3xl z-0"></div>
            </div>
          </div>
        </div>

        {/* Tech badges */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center text-sm mb-4">
            Compatible with all major SQL databases
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-gray-400 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.25C8.5 2.25 6 3.75 6 6s2.5 3.75 6 3.75 6-1.5 6-3.75-2.5-3.75-6-3.75zM6 8.25v3c0 2.25 2.5 3.75 6 3.75s6-1.5 6-3.75v-3c0 2.25-2.5 3.75-6 3.75S6 10.5 6 8.25zM6 12.75v3c0 2.25 2.5 3.75 6 3.75s6-1.5 6-3.75v-3c0 2.25-2.5 3.75-6 3.75s-6-1.5-6-3.75z" />
              </svg>
              MySQL
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.75 12h16.5M12 3.75v16.5" />
              </svg>
              PostgreSQL
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-10.5l9 5.25" />
              </svg>
              SQLite
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              </svg>
              SQL Server
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              Oracle
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
