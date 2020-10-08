参考链接

[原文地址]: https://www.aleksandrhovhannisyan.com/blog/dev/how-to-set-up-react-typescript-ant-design-less-css-modules-and-eslint/



### 用TypeScript创建React项目

```javascript
npx create-react-app <new-project-dir-name> --template typescript
```



### 添加antd和less

**安装antd**

```
yarn add antd
```

现在你可以在项目中按照如下方法引入组件，但是比较麻烦，每次都需要引入样式

```
import Button from 'antd/es/button';
import 'antd/es/button/style';
```

所以可以按照如下操作，简化引入方式：

```
//安装babel-plugin-import
yarn add -D babel-plugin-import

//安装：react-app-rewired、customize-cra， 这个可以使我们自定义create-react-app,而不需要eject我们的项目
yarn add react-app-rewired customize-cra	

//修改package.json中的命令
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}

//根目录下创建config-overrides.js文件,并编辑如下内容
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
);
```

现在你可以这样使用antd:

```javascript
import {Button} from "antd";
```

**安装less**

```
yarn add less less-loader
```

可以用less自定义antd风格，修改config-overrides.js：

```javascript
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#f48549", // customize as needed
        "@link-color": "#e6a07c", // customize as needed
        "@font-size-base": "18px", // customize as needed
      },
    },
  })
);
```

### 添加CSS Module

安装

```
yarn add -D typescript-plugin-css-modules
```

修改tsconfig.json

```
{
  "compilerOptions": {
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
  }
}
```

创建一个_global.d.ts文件(名称任意，只要保证后缀为.d.ts即可)，内容如下

```
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
```

然后就可以使用less module了。



### 添加EsLint和Prettier 

安装

```
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-config-react eslint-plugin-prettier prettier
```

根目录创建.eslintrc.json文件和.prettierrc文件。.prettierrc文件可以不建，在eslint的rules中添加格式规则。

```json
//.eslintrc.json文件内容
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "env": {
    "browser": true,
    "jasmine": true,
    "jest": true
  },
  "rules": {
    "prettier/prettier": ["error"],
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/no-unescaped-entities": 0
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser"
}
```

```json
//.prettierrc文件内容(格式规则)，也可以将这部分内容放到.eslintrc.json文件的rules模块中
{
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "es5"
}
```



vscode可以安装两个插件: ESLint和Prettier-Code formatter。具体参考原文地址

