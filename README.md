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

## Etapa 2: expedition flow

The domain already defines `ResourceType`, `TroopClass`, `Hero`, `Expedition`, and
`ResourceSpot`, but no expedition or combat logic runs yet. The planned flow is:

1. Open the World Map and select a level 1–10 Resource Spot.
2. Select a Hero and troops; compare the deployed force with the defenders.
3. Start an expedition. Troops walk to the city Core and board its vehicle.
4. The vehicle leaves the city, travels across the map, and reaches the spot.
5. Troops fight the defenders. Victory starts resource gathering.
6. When gathering finishes, the vehicle returns and deposits resources in the city.

Internal city producers remain deliberately modest so World Map gathering can become
the main source of Wood, Iron, Water, and Food. Diamond has no producer.
