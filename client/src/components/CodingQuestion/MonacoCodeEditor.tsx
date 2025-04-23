// components/CodeEditor.tsx
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { IBaseFunction } from "../../types/common-types";

const languageOptions: { [key: string]: string } = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  "C++": "cpp",
  Java: "java",
  Go: "go",
};

type CodeEditorProps = {
  baseFunctions?: IBaseFunction[];
  defaultCode?: string;
  defaultLanguage?: string;
  onCodeChange?: (code: string | undefined) => void;
  onLanguageChange?: (lang: string) => void;
  className?: string;
};

const MonacoCodeEditor = ({
  onCodeChange,
  onLanguageChange,
  className,
  baseFunctions,
}: CodeEditorProps) => {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    onLanguageChange?.(selectedLang);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
    onCodeChange?.(value);
  };

  // Initial setup on first mount
  useEffect(() => {
    if (baseFunctions?.length && !language) {
      const initialLang = baseFunctions[0].language;
      setLanguage(initialLang);
      onLanguageChange?.(initialLang);
      setCode(baseFunctions[0].base);
      onCodeChange?.(baseFunctions[0].base);
    }
  }, []);

  // Update code when language is changed explicitly
  useEffect(() => {
    if (baseFunctions && language) {
      const matchingFunction = baseFunctions.find(
        (baseFunction) => baseFunction.language === language
      );
      if (matchingFunction) {
        setCode(matchingFunction.base);
        onCodeChange?.(matchingFunction.base);
      }
    }
  }, [language]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <select
          className="border px-2 py-1 rounded text-sm"
          value={language}
          onChange={handleLanguageChange}
        >
          {baseFunctions?.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language}
            </option>
          ))}
        </select>
      </div>

      <Editor
        className={className}
        language={languageOptions[language]}
        value={code}
        theme="vs-dark"
        onChange={handleCodeChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default MonacoCodeEditor;
