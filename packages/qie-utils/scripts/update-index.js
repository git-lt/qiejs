const path = require("path");
const fs = require("fs-extra");

const source = path.resolve(__dirname, "../src");
const target = path.resolve(source, "index.ts");

const modules = fs
  .readdirSync(source)
  .filter(v => v !== "index.ts")
  .map(v => v.slice(0, v.indexOf(".")));

const getImport = (n, p) => `import * as ${n} from '${p}'`;

const code =
  [...modules.map(v => getImport(v, `./${v}`))].join("\n") +
  `\n\nexport {\n` +
  [...modules].map(v => `  ${v},`).join("\n") +
  "\n}";

fs.writeFileSync(target, code, "utf-8");

console.log("[Success] Update entry file!");
