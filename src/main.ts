import {marked} from 'marked'
import mermaid from 'mermaid'

import './grip.css'
import './erd.css'
import doc from './hw_1_4.md?raw'
import erdDef from './erd.mmd?raw'

const content = marked.parse(doc)
document.querySelector<HTMLDivElement>('#content')!.innerHTML = content

async function drawDiagram(diagramDef: string) {
  const element = document.querySelector<HTMLDivElement>('#erd')!
  const {svg} = await mermaid.render('erd-svg', diagramDef)

  element.innerHTML = svg
}

await drawDiagram(erdDef)
