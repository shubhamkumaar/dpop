import CodeEditor from '@uiw/react-textarea-code-editor';
import rehypePrism from 'rehype-prism-plus';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
export default function Output({
  code,
  setCode,
}: {
  code: string;
  setCode: (value: string) => void;
}) {
  if (!code) {
    return null;
  }

  return (
    <div className="mx-2 mt-8 md:mx-auto md:w-4/5 bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
        Generated SQL Script
      </h2>

      <div
        className="overflow-y-auto overflow-x-auto rounded-md border border-gray-700"
        style={{ maxHeight: '40rem' }} // adjust height as needed
      >
        <CodeEditor
          value={code}
          language="sql"
          placeholder="SQL script will appear here..."
          onChange={evn => setCode(evn.target.value)}
          padding={15}
          rehypePlugins={[
            [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
          ]}
          style={{
            backgroundColor: '#121212',
            color: '#e0e0e0',
            fontFamily:
              'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
            height: '100%',
          }}
          aria-label="Generated SQL script editor"
        />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-4">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast.success('SQL script copied to clipboard!');
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-md"
          aria-label="Copy SQL script to clipboard"
        >
          Copy to Clipboard
        </Button>
        <Button
          onClick={() => {
            toast.success('SQL script downloaded!');
            const blob = new Blob([code], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated_script.sql';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="bg-[#432E54] hover:bg-[#4B4376] text-white font-semibold px-5 py-2 rounded-md"
          aria-label="Download SQL script as file"
        >
          Download SQL Script
        </Button>
      </div>
    </div>
  );
}
