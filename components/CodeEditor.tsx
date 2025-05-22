"use client";
import React, { useEffect, useRef } from "react";
import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  initialDoc: string;
  onChange?: (doc: string) => void;
  language?: "python" | "javascript" | "typescript";
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialDoc,
  onChange,
  language = "python",
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'all',
      contextmenu: true,
      find: {
        addExtraSpaceOnTop: false,
        autoFindInSelection: 'never',
        seedSearchStringFromSelection: 'always'
      }
    });
  };

  const handleEditorChange: OnChange = (value, event) => {
    if (value !== undefined) {
      onChange?.(value);
    }
  };

  // Handle external changes to initialDoc (like Reset button clicks)
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
          lineNumbers: 'on',
          wordWrap: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 4,
          insertSpaces: true,
          renderLineHighlight: 'all',
          selectionHighlight: false,
          occurrencesHighlight: "off",
          folding: true,
          foldingHighlight: true,
          renderWhitespace: 'selection',
          renderControlCharacters: false,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          contextmenu: true,
          mouseWheelZoom: false,
          multiCursorModifier: 'ctrlCmd',
          accessibilitySupport: 'auto',
        }}
      />
    </div>
  );
};

export default CodeEditor;