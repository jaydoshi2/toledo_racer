"use client";
import React, { useEffect, useRef } from "react";
import Editor, { loader, useMonaco, OnMount, OnChange } from "@monaco-editor/react";

// Configure Monaco Editor loader to use CDN
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
  },
});

interface ValidationError {
  line: number;
  column: number;
  message: string;
  severity: "error" | "warning";
}

interface CodeEditorProps {
  initialDoc: string;
  onChange?: (doc: string) => void;
  language?: "python" | "javascript" | "typescript";
  validationErrors?: ValidationError[];
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialDoc,
  onChange,
  language = "python",
  validationErrors = [],
}) => {
  const editorRef = useRef<any>(null); // Use any to avoid monaco import
  const monaco = useMonaco();

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    editor.updateOptions({
      fontSize: 14,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: "on",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      renderLineHighlight: "all",
      contextmenu: true,
      find: {
        addExtraSpaceOnTop: false,
        autoFindInSelection: "never",
        seedSearchStringFromSelection: "always",
      },
    });
  };

  const handleEditorChange: OnChange = (value) => {
    if (value !== undefined) {
      onChange?.(value);
    }
  };

  // Handle validation errors
  useEffect(() => {
    if (editorRef.current && monaco) {
      const model = editorRef.current.getModel();
      if (model) {
        const markers = validationErrors.map((error) => ({
          startLineNumber: error.line,
          startColumn: error.column,
          endLineNumber: error.line,
          endColumn: error.column + 10,
          message: error.message,
          severity:
            error.severity === "error"
              ? monaco.MarkerSeverity.Error
              : monaco.MarkerSeverity.Warning,
        }));

        monaco.editor.setModelMarkers(model, "validation", markers);
      }
    }
  }, [validationErrors, monaco]);

  // Handle external changes to initialDoc
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== initialDoc) {
      editorRef.current.setValue(initialDoc);
    }
  }, [initialDoc]);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden h-full w-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={initialDoc}
        theme="vs-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          lineNumbers: "on",
          wordWrap: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 4,
          insertSpaces: true,
          renderLineHighlight: "all",
          selectionHighlight: false,
          occurrencesHighlight: "off",
          folding: true,
          foldingHighlight: true,
          renderWhitespace: "selection",
          renderControlCharacters: false,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          contextmenu: true,
          mouseWheelZoom: false,
          multiCursorModifier: "ctrlCmd",
          accessibilitySupport: "auto",
        }}
      />
    </div>
  );
};

export default CodeEditor;
