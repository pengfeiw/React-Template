import React from "react";
import { Button } from "antd";
import styles from "./App.module.less"; //像模块一样使用less

const App = () => {
  return (
    <main className={styles.app}>
      <Button type="primary">Hello, Ant Design!</Button>
      <a href="http://www.baidu.com">I'm a link. Click me, please!</a>
    </main>
  );
};

export default App;
