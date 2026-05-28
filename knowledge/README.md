# LockIN Team Bot — Knowledge Base

Drop `.md` or `.txt` files here. The bot loads ALL files in this folder automatically and answers clinical/regulatory questions ONLY from these documents.

## How to add a document

1. Copy or paste the content into a `.md` or `.txt` file
2. Name it clearly: `bfarm-leitfaden-v3-6.md`, `esc-2024-guidelines.md`, `sky-labs-iso-paper.md`
3. Commit and push → Vercel auto-deploys → bot picks it up immediately

## What goes here

- BfArM Leitfaden (DiGA guidance documents)
- ESC/ESH hypertension guidelines
- Sky Labs CART B.P.Pro research papers
- ISO 81060-2:2018 validation data
- Clinical trial protocols (RCT design, endpoints)
- Any external research papers the team is citing

## What does NOT go here

- LockIN project details (already in system prompt — no need to duplicate)
- API keys or passwords
- Patient data

## Size limit

Each file: keep under 50,000 words. Total knowledge base: Claude handles ~200,000 tokens comfortably.
