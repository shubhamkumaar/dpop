import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import axios from "axios";
import Output from "./output";
import Loader from "./loader";
const api_url = import.meta.env.VITE_API_URL;
export default function DDLInput() {
  const [ddl, setDDL] = useState("");
  const [rows_per_table, setRowsPerTable] = useState(30);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerateScript = async () => {
    if (!ddl) {
      alert("Please enter DDL statements.");
      return;
    }
    if (rows_per_table < 1 || rows_per_table > 50) {
      alert("Rows per table must be between 1 and 50.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(api_url, null, {
        params: {
          ddl: ddl,
          rows_per_table: rows_per_table,
        },
      });
      setCode(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-900 text-gray-200 rounded-xl shadow-lg">
      <div className="space-y-6">
        {/* Rows Per Table */}
        <Loader open={loading} />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <label
            htmlFor="rows-input"
            className="block text-lg font-semibold text-gray-200 tracking-wide mb-2 sm:mb-0 sm:min-w-[10rem]"
          >
            Rows Per Table:
          </label>
          <input
            type="number"
            id="rows-input"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 w-full sm:w-64 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-blue-400"
            value={rows_per_table}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= 50) setRowsPerTable(value);
            }}
            placeholder="Enter number of rows..."
            min={1}
            max={50}
            aria-label="Rows per table"
          />
        </div>

        {/* Optional Password Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-red-900 bg-opacity-30 p-2 rounded-md max-w-md">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 12h.01"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <p className="font-semibold text-red-400 text-sm">
              Optional: Enter password only if your table has a password set.
            </p>
          </div>

          <label
            htmlFor="password"
            className="block text-lg font-semibold text-gray-200 tracking-wide mb-2"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 w-full text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-blue-400"
            placeholder="Enter password..."
            aria-label="Password for DDL"
          />
        </div>

        {/* DDL Input */}
        <div>
          <label
            htmlFor="ddl-input"
            className="block text-lg font-semibold text-gray-200 tracking-wide mb-2"
          >
            Enter DDL Statements
          </label>
          <textarea
            id="ddl-input"
            className="bg-gray-800 border border-gray-700 rounded-md p-3 w-full text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            onChange={(e) => setDDL(e.target.value)}
            placeholder="Enter your DDL here..."
            aria-label="DDL statements input"
            spellCheck={false}
          />
        </div>

        {/* Generate Button */}
        <div className="text-right">
          <Button
            onClick={handleGenerateScript}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md"
            aria-label="Generate SQL script"
            disabled={!ddl || loading}
          >
            <ArrowRightCircle className="inline-block w-5 h-5 mr-2" />
            Generate SQL Script
          </Button>
        </div>
      </div>

      {/* Code Output Section */}
      <Output code={code} setCode={setCode} />
    </div>
  );
}
