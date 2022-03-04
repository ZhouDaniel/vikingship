import React, {useContext,useState}from 'react'
import classNames from 'classnames'
import {menuContext} from './menu'
import {IMenuItemProps} from './menuItem'
import Icon from "../../components/Icon/Icon";
// import { CSSTransition } from 'react-transition-group'
import  Transition  from '../Transition/index';
export interface ISubMenuProps {
    index?: string
    title: string,
    className?: string,
}

const SubMenu: React.FC<ISubMenuProps> = ({children,index,title,className}) => {
    const context = useContext(menuContext)
    const openSubMenus = context.defaultOpenSubMenus as Array<string>
    // console.log(openSubMenus)
    const isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(isOpened)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-vertical': context.mode === 'vertical',
        'is-opened': menuOpen,
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer:any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=> {
            setMenuOpen(toggle)
        },300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        // onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        // onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    } : {}

    const renderChildren = () => {
        const subMenuclasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child ,i) => {
            const childElement = child as React.FunctionComponentElement<IMenuItemProps>
            if(childElement.type.displayName === 'menu-item') {
                return React.cloneElement(childElement, {index: `${index}-${i}`})
            } else {
                console.error('Warning:Menu has a child which is not a MenuItem compontent')
            }
        })
        return <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
            <ul className={subMenuclasses}>
                {childrenComponent}
            </ul>
        </Transition> 
    }
    return <li key='index' className={classes} {...hoverEvents}>
        <div className="submenu-title" {...clickEvents}>
            {title}
            <Icon icon='angle-down' className='arrow-icon'></Icon>
        </div>
        {renderChildren()}
    </li>
}
SubMenu.displayName = 'SubMenu'
export default SubMenu