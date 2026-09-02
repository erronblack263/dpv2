import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import JavaScriptObfuscator from "javascript-obfuscator";

const chunksDirectory = path.join(process.cwd(), ".next", "static", "chunks");

async function getJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getJavaScriptFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(entryPath);
    }
  }

  return files;
}

try {
  const files = await getJavaScriptFiles(chunksDirectory);

  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const result = JavaScriptObfuscator.obfuscate(source, {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      disableConsoleOutput: true,
      identifierNamesGenerator: "hexadecimal",
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      stringArray: true,
      stringArrayEncoding: ["base64"],
      stringArrayRotate: true,
      stringArrayThreshold: 0.75,
    });

    await writeFile(filePath, result.getObfuscatedCode(), "utf8");
  }

  console.log(`Obfuscated ${files.length} client JavaScript chunk(s).`);
} catch (error) {
  console.error("Client obfuscation failed:", error);
  process.exitCode = 1;
}
