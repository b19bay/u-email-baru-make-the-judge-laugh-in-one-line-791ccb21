// Make the Judge Laugh in One Line — entry program.
// Writes exactly one funny line (78 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node stdlib only; no network, no clock, no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My resume says 'excellent communicator'; my group chat says 'seen at 3:04 AM'.";
const EXPECTED_CHARS = 78;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length !== EXPECTED_CHARS) {
    console.error(`line must be exactly ${EXPECTED_CHARS} characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`line must be 1-200 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("line must be non-whitespace and a single line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read back: the file on disk must be byte-identical to the line.
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back mismatch: entry.txt differs from the line");
    process.exit(1);
  }
}

main();
