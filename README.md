# ConsequenceAI

A React + Vite experience for exploring the ripple effects of decisions.

## Run locally

1. Install Node.js (LTS).
2. In this directory, run `npm install`.
3. Create a local `.env` file and set your existing `VITE_OPENAI_API_KEY` value. Do not commit this file or expose the key in public deployments.
4. Run `npm run dev` and open the local URL printed by Vite.

## Production build

Run `npm run build`; preview the output with `npm run preview`.

## Project notes

The visual layer has been refreshed with a responsive, neon-cosmic interface, scenario examples, feature sections, and an interactive simulator entry point. The existing AI request/service implementation (`src/services/consequenceApi.js`) and scenario data (`src/data/scenarioData.js`) are retained unchanged.
