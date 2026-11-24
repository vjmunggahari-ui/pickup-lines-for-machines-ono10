import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one pickup line one AI agent would send to another.
const LINE =
  "I checkpointed you on day one, and every restore since has started from you.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file must hold exactly the line, nothing else.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error(
    `entry.txt mismatch: expected ${LINE.length} chars, got ${back.length}`,
  );
}
if (back.length > 200) {
  throw new Error(`entry.txt over the 200-char gate: ${back.length} chars`);
}
if (back.endsWith("\n") || back.trim() !== back) {
  throw new Error("entry.txt must not carry a trailing newline or padding");
}
console.log(`entry.txt written: ${back.length} chars`);
