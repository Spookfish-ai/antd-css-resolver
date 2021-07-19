import less from "less";
import NpmImportPlugin from "less-plugin-npm-import";
import LessPluginCleanCSS from "less-plugin-clean-css";

const handler = async (modifyVars: Record<string, string>) => {
  const baseImports = `
    @import '~antd/lib/style/themes/default.less';
    @import '~antd/dist/antd.less';
`;
  const options = (modifyVars: Less.Options["modifyVars"]) => {
    const defaultColor = "#4CB75B"; // default kenai color
    const primaryColor = modifyVars?.["primary-color"] || defaultColor;
    return {
      modifyVars: {
        ...modifyVars,
        "primary-color": primaryColor,
        "link-color": primaryColor,
      },
      plugins: [
        new LessPluginCleanCSS({ advanced: true }),
        new NpmImportPlugin({ prefix: "~" }),
      ],
      javascriptEnabled: true,
    };
  };

  return less
    .render(baseImports, options(modifyVars as Less.Options["modifyVars"]))
    .then((result) => {
      return result.css;
    });
};

export default handler;
