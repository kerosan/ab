# ab - Lights Out Puzzle Game

An interactive "Lights Out" style puzzle game built with TypeScript. Click cells to toggle them and their adjacent neighbors, aiming to turn all cells the same color to win!

**Live Demo:** https://kerosan.github.io/ab/index.html

## 🎮 Game Mechanics

The objective is to flip all cells on the board to the same state (all black or all white).

### How to Play
1. **Click any cell** to toggle it and its 4 adjacent neighbors (up, down, left, right)
2. **Strategy** - Plan your moves carefully since clicking a cell affects multiple squares
3. **Win** - Turn all cells to the same color (solve the puzzle)
4. **Reset** - Click the reset button to generate a new random puzzle

### Features
- 🎲 **Configurable Board Size** - Start with any grid size (3x3, 4x4, 5x5, etc.)
- 🔀 **Random Generation** - Each game generates a unique solvable puzzle
- ✅ **Win Detection** - Modal popup when you solve the puzzle
- 📊 **Game History** - Track your previous games
- 🎨 **Visual Feedback** - Clear black/white cell styling with hover effects

## 🛠️ Tech Stack

### Current (Updated 2026)
- **Language:** TypeScript 5.3.3
- **Build Tool:** Vite (latest, ESM-first, optimized bundling; installed v8.x)
- **Test Framework:** Vitest 1.0.4 (Jest-compatible, fast execution)
- **Coverage:** v8 provider with HTML/LCOV reporting
- **Package Manager:** Bun (high-performance Node.js alternative)

### Dependencies
- **Runtime:** TypeScript (for type safety)
- **Development:** 
  - Vite with sourcemaps
  - Vitest with jsdom environment
  - Vitest UI for test exploration
  - Cross-env for cross-platform scripts
  - Puppeteer (legacy, optional for E2E)

## 📋 Project Structure

```
src/
├── index.ts              # Entry point & game bootstrap
├── types.ts              # Type definitions (State, etc.)
├── Board/
│   ├── Board.ts          # Core game logic
│   ├── Board.spec.ts     # Board unit tests
│   └── index.ts
├── Cell/
│   ├── Cell.ts           # Cell component
│   └── index.ts
├── Point/
│   ├── Point.ts          # Coordinate system & utilities
│   └── index.ts
├── Player/
│   ├── Player.ts         # Input handling & game flow
│   └── index.ts
├── Modal/
│   ├── Modal.ts          # Win/result modals
│   └── index.ts
└── Renderer/
    ├── Renderer.ts       # HTML rendering & DOM updates
    └── index.ts

docs/                     # Compiled output (bundled game)
coverage/                 # Test coverage reports
```

## 🚀 Getting Started

### Installation
```bash
# Using bun (recommended)
bun install

# Or with npm
npm install
```

### Development

```bash
# Start development server
bun run dev
# or npm run dev

# Build for production
bun run build
# or npm run build

# Build with watch mode
bun run build:watch
# or npm run build:watch

# Run game locally
bun run start
# Serve docs on http://localhost:3003
```

### Testing

```bash
# Run all tests (single run)
bun run test
# or npm test

# Run tests in watch mode
bun run test -- --watch

# Run specific test file
bun run test src/Board/Board.spec.ts

# Generate coverage report
bun run test:coverage
# or npm run test:coverage

# Launch interactive test UI
bun run test:ui
# or npm run test:ui

# View coverage in browser
open coverage/lcov-report/index.html
```

## ✅ Test Coverage

Current test suite includes:
- ✅ Board initialization and state management
- ✅ Cell flipping logic with sibling updates
- ✅ Win condition detection
- ✅ Random board generation
- ✅ Template-based board setup
- ✅ Boundary validation

**All 5 tests passing** ✓

```
Test Files  1 passed (1)
     Tests  5 passed (5)
  Duration  1.45s
```

## 🔧 Configuration Files

### vite.config.ts
- Site build using `index.html` as entry; outputs static site to `docs/`
- Output: `docs/index.html` plus bundled assets in `docs/assets/` (ESM bundles)
- Sourcemap enabled for debugging

### vitest.config.ts
- jsdom environment for DOM testing
- v8 coverage provider
- Multiple reporters: text, json, html, lcov, clover
- Auto-discovery of .spec.ts and .test.ts files

### tsconfig.json
- Module: ES2020 (modern ESM)
- Resolution: bundler (Vite-optimized)
- Target: ES2017 (broad browser compatibility)
- Sourcemaps enabled

## 🔄 Recent Migration (2026)

Successfully migrated from legacy tooling to modern stack:

### Before
- ❌ Jest + ts-jest (slow test execution)
- ❌ Babel + @babel/preset-* (transpilation layer)
- ❌ TypeScript 4.9.5 (older features)
- ❌ tsc bundling (single output file)
- ⚠️ Vulnerable dependencies

### After
- ✅ Vitest (Jest-compatible, 5x faster)
- ✅ Vite (ESM-first, optimized bundling)
- ✅ TypeScript 5.3.3 (modern language features)
- ✅ ESM modules (native browser support)
- ✅ Updated all dependencies (vulnerabilities fixed)

## 📦 Build Output

The project builds a static site into the `docs/` directory (HTML + assets):
- **Output:** `docs/index.html` plus optimized assets under `docs/assets/`
- **Format:** ESM bundles (optimized by Vite; browser-friendly)
- **Size:** Optimized by Vite's build pipeline
- **Sourcemaps:** Included for debugging

## 🌐 Browser Support

- ES2017+ compliant browsers
- Modern Chrome, Firefox, Safari, Edge
- IE 11+ with polyfills (via UMD)

## 📄 License

Unlicense - Public Domain

## 🔗 Repository

- **GitHub:** https://github.com/kerosan/ab
- **Issues:** https://github.com/kerosan/ab/issues
- **Demo:** https://kerosan.github.io/ab/index.html

## 👨‍💻 Development

This project demonstrates:
- TypeScript best practices (type safety, interfaces)
- Object-oriented design patterns (classes, encapsulation)
- DOM manipulation and event handling
- Unit testing with Vitest
- Modern build tool integration
- Responsive game design

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lights Out (Original Game)](https://en.wikipedia.org/wiki/Lights_Out_(game))
