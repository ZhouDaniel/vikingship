import React, { createContext, useState } from "react";
import classNames from "classnames";

type MenuMode = "horizontal" | "vertical";

export interface IMenuProps {
  defaultIndex?: number;
  style?: React.CSSProperties;
  mode?: MenuMode;
  className?: string;
  onSelect?: (selectedIndex: number) => void;
}
interface IContext {
  index: number;
  onSelect?: (selectedIndex: number) => void;
}
export const menuContext = createContext<IContext>({ index: 0 });
const Menu: React.FC<IMenuProps> = (props) => {
  const { children, defaultIndex, style, mode, className, onSelect } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  const handleClick = (index: number) => {
    setCurrentIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const contentValue = {
    index: currentIndex ? currentIndex: 0,
    onSelect: handleClick,
  };
  return (
    <ul className={classes} style={style}>
      <menuContext.Provider value={contentValue}>{children}</menuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: 1,
  mode: "horizontal",
};

export default Menu;
