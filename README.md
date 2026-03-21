# game-types

Types TypeScript partagés entre `game-core`, `game-socket` et `game-web`.

## Contenu

- Modèles de domaine : `RoomInfo`, `HouseInfo`, `UserInfo`, `RoomState`…
- Interfaces des events STOMP
- Enums et constantes communes

## Utilisation

Ce package est consommé en tant que workspace Bun par les autres modules :

```json
// package.json des modules consommateurs
{
  "dependencies": {
    "@toon-live/game-types": "workspace:*"
  }
}
```

## Build

```bash
bun run build
```
