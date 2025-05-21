// import { Button } from "@/components/ui/button";
import { useState } from 'react';
import {
  ArrowRightCircle,
  AlertCircle,
  Code,
  Database,
  Check,
  Clipboard,
  Eye,
  EyeOff,
} from 'lucide-react';
import axios from 'axios';
import Output from './output';
import Loader from './loader';

const api_url = import.meta.env.VITE_API_URL;

const DDLInput = () => {
  const [ddl, setDDL] = useState('');
  const [rows_per_table, setRowsPerTable] = useState(30);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleGenerateScript = async () => {
    if (!ddl) {
      alert('Please enter DDL statements.');
      return;
    }
    if (rows_per_table < 1 || rows_per_table > 50) {
      alert('Rows per table must be between 1 and 50.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(api_url, null, {
        params: {
          ddl: ddl,
          rows_per_table: rows_per_table,
          password: password,
        },
      });
      setCode(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyDDLExample = () => {
    const example = `CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  stock INT DEFAULT 0
);`;

    navigator.clipboard.writeText(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <section id="generator">
        <div className="mx-2 md:w-4/5 md:mx-auto bg-gray-900 text-gray-100 p-6 md:p-8 rounded-xl border border-gray-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-400 flex items-center">
              <Database className="mr-2" size={24} />
              SQL Generator
            </h2>
            <div className="bg-blue-900/30 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
              Generate up to 50 rows
            </div>
          </div>

          <div className="space-y-6">
            {/* Rows Per Table */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
              <label
                htmlFor="rows-input"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Rows Per Table
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="rows-range"
                  min="1"
                  max="50"
                  value={rows_per_table}
                  onChange={e => setRowsPerTable(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400 px-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="number"
                    id="rows-input"
                    className="bg-gray-700 border border-gray-600 rounded-lg p-3 w-24 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={rows_per_table}
                    onChange={e => {
                      const value = Number(e.target.value);
                      if (value >= 1 && value <= 50) setRowsPerTable(value);
                    }}
                    min={1}
                    max={50}
                  />
                  <span className="ml-3 text-gray-300">rows</span>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                  Optional
                </div>
              </div>

              <div className="flex items-center gap-3 bg-blue-900/20 p-3 rounded-lg border border-blue-800/30 mb-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="font-medium text-blue-300 text-sm">
                  Only required if your schema contains password fields that
                  need hashing
                </p>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 w-full text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Enter password to be hashed..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                bcrypt (HS256) will be used for hashing any password columns
              </div>
            </div>

            {/* DDL Input */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="ddl-input"
                  className="block text-lg font-medium text-gray-300"
                >
                  Enter DDL Statements
                </label>
                <button
                  type="button"
                  onClick={copyDDLExample}
                  className="flex items-center gap-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-2 rounded transition-colors"
                >
                  {copied ? <Check size={12} /> : <Clipboard size={12} />}
                  {copied ? 'Copied' : 'Copy Example'}
                </button>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 border-b border-gray-600 rounded-t-lg flex items-center px-4">
                  <Code size={16} className="text-blue-400 mr-2" />
                  <span className="text-xs font-medium text-gray-300">SQL</span>
                </div>
                <textarea
                  id="ddl-input"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-4 w-full text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm h-48 resize-y pt-10"
                  onChange={e => setDDL(e.target.value)}
                  placeholder="CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);"
                  spellCheck={false}
                  value={ddl}
                />
                {!ddl && (
                  <div className="absolute top-8 right-0 bg-red-500/20 text-red-300 text-xs font-medium px-2 py-1 rounded-bl-md">
                    Required
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerateScript}
                disabled={!ddl || loading}
                className={`px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 flex items-center gap-2 ${
                  !ddl || loading
                    ? 'bg-gray-700 cursor-not-allowed opacity-70'
                    : 'bg-[#432E54] from-[#432E54] to-[#4B4376] hover:from-[#4B4376] hover:to-[#432E54] hover:shadow-[#4B4376] hover:shadow-lg'
                }`}
              >
                {!loading && (
                  <>
                    <ArrowRightCircle className="w-5 h-5" />
                    Generate SQL Script
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <Output code={code} setCode={setCode} />
      </section>
      <Loader open={loading} />
    </>
  );
};
export default DDLInput;
