import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  label?: string;
  containerStyles?: React.CSSProperties;
  error?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"], // Enables code block
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block", // Enables code formatting
  "link",
  "image",
  "align",
  "color",
  "background",
];

const RichTextEditor: React.FC<Props> = ({
  value,
  onChange,
  label,
  containerStyles,
  error,
}) => {
  const quillRef = useRef(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        ...containerStyles,
      }}
    >
      {label && <label style={{ fontSize: "0.875rem" }}>{label}</label>}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={(value) => {
          if (value === "<p><br></p>") onChange?.("");
          else onChange?.(value);
        }}
        modules={modules}
        formats={formats}
        style={{ height: "200px", borderRadius: "0.625rem" }}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RichTextEditor;
