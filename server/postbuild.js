const fs = require("fs");

fs.writeFileSync(
    "dist/index.js",
    'require("./server/src/index.js");\n',
);
