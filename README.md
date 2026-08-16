# UNDERGROUND

Offline-first mobile 4X/city-builder vertical slice made with Expo, React Native, and TypeScript.

## Run

```bash
npm install
npm start
```

Scan the QR code with Expo Go. Drag the oversized city, tap buildings and build sites, and long-press the avatar in development to open the debug toolbox.

## Architecture

- `src/components`: presentation, fixed HUDs, draggable city, sheets, and Core visuals.
- `src/game`: state orchestration and app lifecycle.
- `src/data`: data-driven buildings, economy values, and quests.
- `src/systems`: pure economy, production, power, and timer logic.
- `src/storage`: versioned AsyncStorage save adapter.
- `src/types` and `src/constants`: domain contracts and centralized tuning.

The city is deliberately offline-only. Multiplayer, combat, monetization, and a functional world map are outside this pilot.
