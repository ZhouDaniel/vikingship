import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={1} onSelect={(index)=>{alert(index)}}>
          <MenuItem index={0}>cool Link</MenuItem>
          <MenuItem index={1}>cool Link2</MenuItem>
          <MenuItem index={2}>cool Link3</MenuItem>
        </Menu>

        <Button disabled> disable </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            alert("123");
          }}
        >
          {" "}
          hello{" "}
        </Button>
        <Button size={ButtonSize.large}> large </Button>
        <Button size={ButtonSize.small}> small </Button>
        <Button btnType={ButtonType.Default}> Default </Button>
        <Button btnType={ButtonType.Primary}> Primary </Button>
        <Button btnType={ButtonType.Danger}> Danger </Button>
        <Button
          btnType={ButtonType.Link}
          href={"https://www.baidu.com"}
          target="_blank"
        >
          {" "}
          baidu Link{" "}
        </Button>
        <Button
          btnType={ButtonType.Link}
          href={"https://www.baidu.com"}
          disabled
        >
          {" "}
          baidu Link | disabled
        </Button>
        <p>learn react</p>
      </header>
    </div>
  );
}

export default App;
