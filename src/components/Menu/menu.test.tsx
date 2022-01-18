import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
//   wait,
  screen,
  cleanup,
} from "@testing-library/react";
import Menu, { IMenuProps } from "./menu";
import MenuItem from "./menuItem";
// import SubMenu from './subMenu'
// jest.mock('../Icon/icon', () => {
//   return () => {
//     return <i className="fa" />
//   }
// })
// jest.mock('react-transition-group', () => {
//   return {
//     CSSTransition: (props: any) => {
//       return props.children
//     }
//   }
// })
const testProps: IMenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: IMenuProps = {
  defaultIndex: 0,
  mode: "vertical",
  //   defaultOpenSubMenus: ['4']
};
const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
      {/* <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu> */}
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    //   wrapper.container.append(createStyleFile())
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElement = screen.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(3);
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const thirdItem = screen.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    cleanup();
  });
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup()
    render(generateMenu(testVerProps));
    const menuElement = screen.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
});
