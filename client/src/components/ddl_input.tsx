import { Button } from "@/components/ui/button";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";
import axios from "axios";
export default function DDLInput() {
  const [ddl, setDDL] = useState("");
  const [code, setCode] = useState(
    `CREATE TABLE order_items (
        item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID NOT NULL,
        product_name VARCHAR(100),
        quantity INT CHECK (quantity > 0),
        price DECIMAL(10, 2),
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    );`
  );

  const handleGenerateScript = async () => {
    console.log("Button clicked");
    if (!ddl) {
      alert("Please enter DDL statements.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/",null,{
        params: {
          ddl: ddl,
          rows_per_table: 30
        },
      });
      setCode(response.data.message);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error generating script:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="ddl-input" className="text-xl font-semibold">
          Enter DDL statements
        </label>
        <textarea
          id="ddl-input"
          className="border border-gray-300 rounded-md p-2"
          rows={5}
          onChange={(e) => setDDL(e.target.value)}
          placeholder="Enter your DDL here..."
        />
        <Button onClick={handleGenerateScript}>Generate SQL Script</Button>
      </div>

      <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Generated SQL Script</h2>
        <CodeEditor
          value={code}
          language="sql"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          rehypePlugins={[
            [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
          ]}
          style={{
            backgroundColor: "#000000",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
    </div>
  );
}
