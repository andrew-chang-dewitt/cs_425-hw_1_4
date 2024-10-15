const path = require("path");
const { readFile, writeFile } = require("fs").promises;
const { JSDOM } = require("jsdom");

const getFilePath = (pathStr) => {
  return path.join(__dirname, "../" + pathStr);
};

const getFileContents = async (filePath) => {
  try {
    console.info(`Opening '${filePath}' ...`);
    return await readFile(filePath, { encoding: "utf8" });
  } catch (err) {
    console.error(`Error encountered while reading file.`);
    throw err;
  }
};

const writeFileContents = async (filePath, contents) => {
  try {
    console.info(`Writing contents to '${filePath}' ...`);
    await writeFile(filePath, contents);
  } catch (err) {
    console.error(`Error encountered while writing file to '${filePath}'.`);
    throw err;
  }

  console.info("File written succesfully.");

  return true;
};

const styleSVGStr = (svgStr, cssStr) => {
  const svgDOM = new JSDOM(svgStr);
  const document = svgDOM.window.document;
  const svgNode = document.getElementById("my-svg");

  const styleNode = document.createElement("style");
  styleNode.append(document.createTextNode(cssStr));

  svgNode.append(styleNode);

  return svgNode.outerHTML;
};

const main = async () => {
  const svgPath = getFilePath(process.argv[2]);
  const cssPath = getFilePath(process.argv[3]);
  const svgContents = await getFileContents(svgPath);
  const cssContents = await getFileContents(cssPath);

  const styledContents = styleSVGStr(svgContents, cssContents);

  await writeFileContents(svgPath, styledContents);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
