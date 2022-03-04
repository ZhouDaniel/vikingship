import React, { createContext, useState } from "react";
import classNames from "classnames";
import {IMenuItemProps} from './menuItem'
type MenuMode = "horizontal" | "vertical";

export interface IMenuProps {
  defaultIndex?: string;
  style?: React.CSSProperties;
  mode?: MenuMode;
  className?: string;
  onSelect?: (selectedIndex: string) => void;
  defaultOpenSubMenus?: string[]
}
interface IContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?:MenuMode;
  defaultOpenSubMenus?: string[]
}
export const menuContext = createContext<IContext>({ index: '0' });
const Menu: React.FC<IMenuProps> = (props) => {
  const { children, defaultIndex, style, mode, className, onSelect,defaultOpenSubMenus } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    'menu-horizontal': mode !== 'vertical',
    // "menu-horizontal": mode === "horizontal",
  });
  const handleClick = (index: string) => {
    setCurrentIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const contentValue = {
    index: currentIndex ? currentIndex: '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    return React.Children.map(children,(child,index) => {
        const childElement = child as React.FunctionComponentElement<IMenuItemProps>
        // const childElement = child as React.ReactElement<IMenuItemProps>
        const {displayName} = childElement.type;
        if(displayName === 'menu-item' || displayName === 'SubMenu') {
            // return child
            return React.cloneElement(childElement, {index: index.toString()})
        } else {
            console.error('Warning:Menu has a child which is not a MenuItem compontent')
        }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <menuContext.Provider value={contentValue}>{renderChildren()}</menuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: '0',
  mode: "horizontal",
  defaultOpenSubMenus: []
};

export default Menu;
