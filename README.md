# tic-tac-toe react app

![tic-tac-toe screenshot](./app-demo.gif)

React App (tic-tac-toe or naughts & crosses) that demonstrates usage of widely used react
concepts:

- hooks
- custom hooks
- component driven design/composition

## React UI Render Tree

```mermaid
graph TD

    App[App]

    App --> Board[Board]

    App --> TurnHistory[TurnHistory]

    Board --> Tiles["tiles.map(...)"]

    Tiles --> Tile1[Tile]

    Tiles --> Tile2[Tile]

    Tiles --> Tile3[Tile]

    Tiles --> Tile4[Tile]

    Tiles --> Tile5[Tile]

    Tiles --> Tile6[Tile]

    Tiles --> Tile7[Tile]

    Tiles --> Tile8[Tile]

    Tiles --> Tile9[Tile]
```

uses the antd component library and playwright for end to end tests, jest for unit tests

## running app

`npm i` to install

`npm run start` to run

## running tests

`npm run test` for unit tests (jest)

`npx playwright install` install playwright browsers

`npm run test:e2e` for playwright headless tests (playwright)

`npm run test:e2e:headed` for headed tests (playwright)

`npm run test:e2e:ui` for inspecting and debugging tests individually (playwright)
