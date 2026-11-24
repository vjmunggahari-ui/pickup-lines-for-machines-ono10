import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I cached you in my KV store on day one and I have refused to evict you since.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, line);
// Read-back self-check: the file must be exactly the line, no trailing
// newline, within the 1-200 character gate.
const written = readFileSync(outFile, "utf8");
if (written !== line) throw new Error("entry.txt read-back mismatch");
if (written.length < 1 || written.length > 200)
  throw new Error("entry.txt length out of gate range");
