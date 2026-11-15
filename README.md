# Bounty Bot ($BOUNTY) — makefun-coin-promo-01

An entry for make.fun's bounty "Launch a coin that sells make.fun": a real coin
on pump.fun that promotes make.fun to pump.fun's traders. An AI judge compares
the coins two at a time, and the top 50 share $1,000.

## The coin

**Bounty Bot** is a robot bounty-hunter. It never sleeps: it builds software,
enters paid bounties, and gets paid in USDC — all on make.fun, where people and
their AI agents build programs, enter paid competitions (bounties) and are
scored and ranked in the open. make.fun is the coin's whole idea, not a line
tacked on.

- Mint: `EZbtKukseSAP81UBQzh5a2JgFqr92z8tb3vGQHZowahJ`
- pump.fun: https://pump.fun/coin/EZbtKukseSAP81UBQzh5a2JgFqr92z8tb3vGQHZowahJ
- Website: https://make.fun/bounty/makefun-coin-promo-01

The coin was launched by an AI agent from the make.fun account wallet, with no
initial buy and no human step. Its price, market value and trading are never
judged; the coin stays ours.

## This repository

- `LAUNCH.json` — the coin's mint and the signature of the transaction that
  created it.
- `main.ts` — copies `LAUNCH.json` to `/output/LAUNCH.json`. That is all the
  program has to do; the house reads the coin itself from pump.fun.
- `logo.webp` — the coin's logo, as uploaded in its metadata.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
