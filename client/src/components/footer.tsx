import { Github, Linkedin, Mail, ExternalLink, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-4 bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">dpop</h3>
            <p className="mb-4">
              A tool designed to help developers generate realistic test data
              for SQL databases. Created as a student project to simplify
              database testing and development.
            </p>
            <div className="flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                Student Project
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.w3schools.com/MySQL/default.asp"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  MySQL Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://www.postgresql.org/docs/"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  PostgreSQL Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://www.dbvis.com/wp-content/uploads/2024/04/SQL-Cheat-Sheet.pdf"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  SQL Cheat Sheet
                </a>
              </li>
              <li>
                <a
                  href="https://www.geeksforgeeks.org/database-design-ultimate-guide/"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Database Design Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Developer</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
              <p className="font-medium text-lg text-white mb-1">
                Shubham Kumar
              </p>
              <p className="text-sm mb-3">Computer Science Student</p>
              <p className="text-sm mb-1">Vellore Institute of Technology</p>
              <p className="text-sm">Class of 2026</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/shubhamkumaar/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/shub01"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:shubhamkumarjhadss8@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.instagram.com/shubham_kumaar_/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {currentYear} SQL Generator. Created as a student project.
          </p>
          <div className="flex space-x-4 text-sm">
            <span className="cursor-pointer hover:text-blue-400 transition-colors">
              Terms
            </span>
            <span className="cursor-pointer hover:text-blue-400 transition-colors">
              Privacy
            </span>
            <span className="text-gray-600">v1.0.0</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-gray-600 bg-gray-800/50 p-3 rounded-lg">
          <p>
            This tool is designed for educational and development purposes only.
            All generated data is fictional and any resemblance to real data is
            coincidental. Not intended for production environments.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
