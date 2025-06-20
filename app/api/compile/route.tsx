import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { code, language, input } = await req.json();

  const languageMap: Record<string, { language: string; version: string }> = {
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "cpp", version: "10.2.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
  };

  if (!languageMap[language]) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }

  // Wrap Python code to ensure function is called
  let wrappedCode = code;
  if (language === "python") {
    wrappedCode += `\n\ntry:\n    print(reward_function({'track_width': 1.0, 'distance_from_center': 0.2}))\nexcept Exception as e:\n    import sys\n    sys.stderr.write(str(e))`;
  }

  const payload = {
    language: languageMap[language].language,
    version: languageMap[language].version,
    files: [{ name: "main", content: wrappedCode }],
    stdin: input || "",
  };

  try {
    const res = await axios.post("https://emkc.org/api/v2/piston/execute", payload, {
      headers: { "Content-Type": "application/json" },
    });

    const result = res.data.run;
    return NextResponse.json({
      stdout: result.stdout,
      stderr: result.stderr,
      code: result.code,
    });
  } catch (error) {
    return NextResponse.json({ error: "Compilation failed" }, { status: 500 });
  }
}
