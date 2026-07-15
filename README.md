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

    App["<App />"]

    App --> Board["<Board />"]

    App --> TurnHistory["<TurnHistory />"]

    Board --> Tile1["<Tile />"]

    Board --> Tile2["<Tile />"]

    Board --> Tile3["<Tile />"]

    Board --> Tile4["<Tile />"]

    Board --> Tile5["<Tile />"]

    Board --> Tile6["<Tile />"]

    Board --> Tile7["<Tile />"]

    Board --> Tile8["<Tile />"]

    Board --> Tile9["<Tile />"]

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
