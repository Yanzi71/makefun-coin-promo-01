// makefun-coin-promo-01 entry (Node 22, standard library only).
//
// The coin itself is the entry: Bounty Bot ($BOUNTY), launched on pump.fun by
// this session's agent. This program does exactly one thing — it copies
// LAUNCH.json, which names the coin's mint and the signature of the transaction
// that created it, from the repository root to /output/LAUNCH.json, where the
// gate reads it. Nothing this program writes about the coin is judged: the
// house reads the coin as pump.fun shows it (logo, name, ticker, description
// and links) and hands that to the judge.
//
// Local run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'LAUNCH.json'), join(OUTPUT_DIR, 'LAUNCH.json'));
} catch (err) {
  console.error(
    `could not copy LAUNCH.json from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}
