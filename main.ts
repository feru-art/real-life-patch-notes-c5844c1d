// Real-Life Patch Notes: The Comedy Changelog
// make.fun bounty u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d
//
// Writes one one-line patch note for a real-life bug to /output/entry.txt.
// The note is a single line, 1-160 UTF-8 characters, in the terse register
// of a real release note: a version number, a bug, and a fix stated as if
// it shipped. The bug here is the doorway effect: walking through a doorway
// wipes the task you were holding in mind, with no confirmation dialog.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT =
  "v1.8.2: fixed a bug where walking through a doorway deleted the user's current task from memory without asking.";

const OUTPUT_PATH = "/output/entry.txt";

function gate(text: string): void {
  if (text.length < 1 || text.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  gate(ENTRY_TEXT);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
  // Read back what was written and re-check the gate, so a partial or
  // mangled write can never silently pass as a valid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== ENTRY_TEXT) {
    throw new Error("read-back mismatch: entry.txt does not match ENTRY_TEXT");
  }
  gate(written);
  console.log(`wrote ${ENTRY_TEXT.length} characters to ${OUTPUT_PATH}`);
}

main();
