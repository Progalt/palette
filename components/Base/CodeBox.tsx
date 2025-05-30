"use client";

import { Copy } from "lucide-react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // or /styles/prism

interface CodeBoxProps {
  language?: string;
  children?: React.ReactElement;
}

const customStyle = {
  ...docco,
  hljs: {
    ...docco["hljs"],
    backgroundColor: "transparent",
  },
};



const CodeBox: React.FC<CodeBoxProps> = ({ children, language }) => {
  return (
    <div className="rounded-md bg-gray-100 ">
      <div className="h-10 bg-gray-200 text-gray-500 rounded-t-md p-2 px-3 flex flex-row justify-between items-center">
        {language}

        <button className="hover:bg-gray-300 p-2 rounded-md">
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="p-2">
        <SyntaxHighlighter language={language} style={customStyle} >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBox;
