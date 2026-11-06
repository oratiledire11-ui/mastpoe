# Christoffel's Kitchen - Chef's Menu Manager (POE Part 3)

React Native / Expo app for managing a restaurant menu. Prices are in South African Rand (ZAR).

## Run in VS Code

1. Install Node.js (LTS) from https://nodejs.org
2. Unzip the project and open the folder in VS Code (File > Open Folder)
3. Open the terminal (Ctrl + `) and run:

```bash
npm install
npx expo start
```

4. Scan the QR code with Expo Go (Android/iOS), or press `a` (Android emulator), `i` (iOS simulator) or `w` (web).

If Expo Go reports a version mismatch, run `npx expo install --fix`.

## Part 3 requirements

| Requirement | Where |
|---|---|
| **1. Manage items** - edit, update, delete (changes show immediately) | Pencil / bin icons on each dish in `MenuScreen`; `DishFormScreen` (edit mode); delete confirmation in `ConfirmModal` |
| **2. Search & filter** - search by name, filter by course, clear | Search bar, course chips (All / Starter / Main Course / Dessert) and "Clear search / filter" in `MenuScreen`; logic in `filterMenu()` in `src/utils.js` |
| **3. Statistics** - total items, average price, items per course | `StatsScreen` (also a summary pill on the home screen); logic in `getStats()` in `src/utils.js` |

## Project structure

```
App.js                    state (menu list) + navigation
index.js                  Expo entry point
src/constants.js          colours, course list, starting menu
src/utils.js              filterMenu(), getStats(), formatPrice()
src/components/           Screen, Header, DishCard, CourseBadge, ConfirmModal
src/screens/              HomeScreen, MenuScreen, DishFormScreen, StatsScreen
```

## Improvements over Part 2

- Fixed a bug where inner components were re-created on every keystroke (inputs lost focus while typing); screens are now separate components.
- Inline form validation instead of pop-up alerts; prices accept cents (e.g. 89.50).
- Delete confirmation modal that works on Android, iOS and web.
- Android hardware back button support.
- Statistics are derived from the menu state, so they update instantly after any change.

Menu data is held in React state (resets when the app reloads). A database or AsyncStorage could be added later.
