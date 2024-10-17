import { marked } from "marked"
// import { mermaid } from "mermaid";

import "./grip-styles/code.css"
import "./grip-styles/dark_tritanopia.css"
import "./grip-styles/github.css"
import "./grip-styles/global.css"
import "./grip-styles/light_tritanopia.css"
import "./grip-styles/primer.css"
import "./grip-styles/primer-primitives.css"
import "./grip.css"
import "./erd.css"
import doc from "./hw_1_4.md?raw"
import "./erd.mmd"
// import erdDef from "./erd.mmd?raw";

const content = marked.parse(doc)
document.querySelector<HTMLDivElement>("#vite-goes-here")!.innerHTML = content

// async function drawDiagram(diagramDef: string) {
//   const element = document.querySelector<HTMLDivElement>("#erd")!;
//   const { svg } = await mermaid.render("erd-svg", diagramDef);
//
//   element.innerHTML = svg;
// }
//
// await drawDiagram(erdDef);
