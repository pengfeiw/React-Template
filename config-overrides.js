// const {override, fixBabelImports, addLessLoader} = require("customize-cra");

// module.exports = override(
//     fixBabelImports("import", {
//         libraryName: "antd",
//         libraryDirectory: "es",
//         style: "css"
//     }),
//     //可以自定义antd样式风格
//     // addLessLoader({
//     //     lessOptions: {
//     //         javascriptEnabled: true,
//     //         modifyVars: {
//     //             "@primary-color": "#f48549", // customize as needed
//     //             "@link-color": "#e6a07c", // customize as needed
//     //             "@font-size-base": "18px" // customize as needed
//     //         }
//     //     }
//     // })
// );


const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,        //用less的话，这里要改成true
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        // 自定义antd初始风格
        // "@primary-color": "#f48549", // customize as needed
        // "@link-color": "#e6a07c", // customize as needed
        // "@font-size-base": "18px", // customize as needed
      },
    },
  })
);
