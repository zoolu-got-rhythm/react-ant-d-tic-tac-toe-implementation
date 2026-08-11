# tic-tac-toe react app

uses the antd component library and playwright for end to end tests, jest for unit tests

![tic-tac-toe screenshot](./app-demo.gif)

React App (tic-tac-toe or naughts & crosses) that demonstrates usage of widely used react
concepts:

- hooks
- custom hooks
- component driven design/composition
- usage of memo and useCallback
- usage of useRef and "low level" html canvas drawing/abstraction

## React UI Render Tree for practise mode

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

## architectural diagram for web socket online play with react 

```mermaid

flowchart TB

    User([User])

    subgraph Frontend["React Frontend (TypeScript)"]
        Components["React Components"]
        Router["React Router"]
        Store["React State Management"]
        WSClient["Socket.IO Client"]
        Hooks["Hooks"]

        Components --> Hooks
        Router --> Components
        Hooks --> WSClient
        WSClient --> Store
        Store --> Components
    end

    subgraph Backend["Node.js Backend (TypeScript)"]

        subgraph Express["Express Server"]
            subgraph Socket["Socket.IO Server"]
            end
        end

        Game["Tic Tac Toe Game Logic"]
       

        Socket <-->|Events| Game
    end

    User --> Components

    WSClient <-->|WebSocket| Socket
```

## running app in dev environment

### running server

cd into server and run: 

`npm i` to install dependencies 

then: `npm run dev` to start server 

### running client

`npm i` to install dependencies 

`npm run start` to run react app

## running app in production environment

from root run `npm run build`

from /server run `npm run build`

from /server then run `NODE_ENV=production npm run start`

## running tests

`npm run test` for unit tests (jest)

`npx playwright install` install playwright browsers

`npm run test:e2e` for playwright headless tests (playwright)

`npm run test:e2e:headed` for headed tests (playwright)

`npm run test:e2e:ui` for inspecting and debugging tests individually (playwright)
