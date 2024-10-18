import mermaidToSVG from "./plugins/mermaid-to-svg"

export default {
  plugins: [mermaidToSVG()],
  css: {
    postcss: {
      map: true
    }
  },
}
