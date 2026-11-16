// makefun-coin-promo-01 entry (Node 22, standard library only).
//
// The coin itself is the entry: Bounty Bot ($BOUNTY), launched on pump.fun by
// this session's agent. This program does exactly one thing — it validates
// LAUNCH.json, which names the coin's mint and the signature of the
// transaction that created it, and copies it from the repository root to
// /output/LAUNCH.json, where the gate reads it. Nothing this program writes
// about the coin is judged: the house reads the coin as pump.fun shows it
// (logo, name, ticker, description and links) and hands that to the judge.
//
// Validation is deliberate, not cosmetic: a malformed LAUNCH.json (wrong
// mint, missing signature, unparseable JSON) would otherwise be copied
// silently and fail the gate later, with no hint of what went wrong. Here
// the program refuses to copy a bad file and names the offending field, so
// a broken launch record is caught at build time instead of at judging.
//
// Local run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Base58 alphabet (no 0, O, I or l) — Solana mint addresses and transaction
// signatures are base58 strings over this alphabet.
const BASE58_RE = /^[1-9A-HJ-NP-Za-km-z]+$/;

function fail(message: string): never {
  console.error(`invalid LAUNCH.json: ${message}`);
  process.exit(1);
}

const launchPath = join(BOT_DIR, 'LAUNCH.json');
let raw: string;
try {
  raw = readFileSync(launchPath, 'utf8');
} catch (err) {
  console.error(
    `could not read LAUNCH.json from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}

let launch: unknown;
try {
  launch = JSON.parse(raw);
} catch (err) {
  fail(`not valid JSON: ${(err as Error).message}`);
}

if (typeof launch !== 'object' || launch === null || Array.isArray(launch)) {
  fail('top level must be a JSON object with "mint" and "create_signature"');
}

const { mint, create_signature: createSignature } = launch as Record<
  string,
  unknown
>;

if (typeof mint !== 'string' || mint.length !== 44 || !BASE58_RE.test(mint)) {
  fail(
    `"mint" must be a 44-character base58 string, got ${JSON.stringify(mint)}`,
  );
}

if (
  typeof createSignature !== 'string' ||
  createSignature.length === 0 ||
  !BASE58_RE.test(createSignature)
) {
  fail(
    `"create_signature" must be a non-empty base58 string, got ${JSON.stringify(createSignature)}`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(launchPath, join(OUTPUT_DIR, 'LAUNCH.json'));
} catch (err) {
  console.error(
    `could not copy LAUNCH.json from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}

console.log(`LAUNCH.json validated and copied (mint ${mint})`);
