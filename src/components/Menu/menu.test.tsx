import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import Menu, { IMenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from './subMenu'
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
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: IMenuProps = {
  defaultIndex: '0',
  mode: "vertical",
  //   defaultOpenSubMenus: ['4']
};
const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      {/* <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu> */}
    </Menu>
  );
};
const createStyleFile = () => {
    const cssFile: string = `
      .viking-submenu {
        display: none;
      }
      .viking-submenu.menu-opened {
        display:block;
      }
    `
    const style = document.createElement('style')
    // style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile())
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElement = screen.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(menuElement.getElementsByTagName("li").length).toEqual(5);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const thirdItem = screen.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    cleanup();
  });
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup()
    render(generateMenu(testVerProps));
    const menuElement = screen.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it('should show dropdown items when hover on subMenu', async () => {
    expect(screen.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(screen.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).not.toBeVisible()
    })
  })
});
