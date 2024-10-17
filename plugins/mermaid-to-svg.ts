import { JSDOM } from "jsdom"
import { run } from "@mermaid-js/mermaid-cli"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { Plugin, createFilter } from "vite"

export interface Options {
  include?: string
  exclude?: string
  outDir?: string
  styles?: string
}

interface privateOptions {
  include: string
  exclude: string
  outDir: string
  styles: string
}

const defaultOptions: privateOptions = {
  include: "**/*.mmd",
  exclude: "",
  outDir: "./public",
  styles: "",
}

const getFileContents = async (filePath): Promise<string> => {
  try {
    return await readFile(filePath, { encoding: "utf8" })
  } catch (err) {
    console.error(`[mermaidToSVG]: Error encountered while reading file.`)
    throw err
  }
}

const writeFileContents = async (filePath, contents): Promise<void> => {
  try {
    return await writeFile(filePath, contents)
  } catch (err) {
    console.error(
      `[mermaidToSVG]: Error encountered while writing file to '${filePath}'.`,
    )
    throw err
  }
}

const styleSVGStr = (svgStr, cssStr): string => {
  const svgDOM = new JSDOM(svgStr)
  const document = svgDOM.window.document
  const svgNode = document.getElementById("my-svg")
  const styleNode = document.createElement("style")
  styleNode.append(document.createTextNode(cssStr))

  svgNode.append(styleNode)

  return svgNode.outerHTML
}

export default function mermaidToSVG(options: Options = {}): Plugin {
  const opts = {
    ...defaultOptions,
    options,
  }

  return {
    name: "vite-mermaid-to-svg",
    // something to help vite know not to try to parse mmd file as js
    load: (id) => {
      // stop if file not in include, or if is in exclude
      const filter = createFilter(opts.include, opts.exclude)
      if (!filter(id)) return null

      // do nothing for mmd files, they'll be transformed to svgs in the public dir later
      return {
        code: "",
        moduleSideEffects: false,
      }
    },
    transform: async (_, id) => {
      // stop if file not in include, or if is in exclude
      const filter = createFilter(opts.include, opts.exclude)
      if (!filter(id)) return null

      const inPath = path.parse(id)

      const inPathStr = path.normalize(id)
      const outPathStr = path.resolve(
        __dirname,
        "../",
        opts.outDir,
        `${inPath.name}.svg`,
      ) as `${string}.svg`

      await run(inPathStr, outPathStr)

      const cssPathStr = path.resolve(inPath.dir, `${inPath.name}.css`)

      const svgContents = await getFileContents(outPathStr)
      const cssContents = await getFileContents(cssPathStr)

      const styledContents = styleSVGStr(svgContents, cssContents)

      await writeFileContents(outPathStr, styledContents)

      console.log(
        `[mermaidToSVG]: diagram generated from ${inPathStr} saved to ${outPathStr}`,
      )
    },
  }
}
