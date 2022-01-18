import React, {useContext,useState}from 'react'
import classNames from 'classnames'
import {menuContext} from './menu'
import {IMenuItemProps} from './menuItem'
export interface ISubMenuProps {
    index?: number
    title: string,
    className?: string,
}

const SubMenu: React.FC<ISubMenuProps> = ({children,index,title,className}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const context = useContext(menuContext)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
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
        const childrenComponent = React.Children.map(children, (child ,index) => {
            const childElement = child as React.FunctionComponentElement<IMenuItemProps>
            if(childElement.type.displayName === 'menu-item') {
                return childElement
            } else {
                console.error('Warning:Menu has a child which is not a MenuItem compontent')
            }
        })
        return <ul className={subMenuclasses}>
            {childrenComponent}
        </ul>
    }
    return <li key='index' className={classes} {...hoverEvents}>
        <div className="submenu-title" {...clickEvents}>{title}</div>
        {renderChildren()}
    </li>
}
SubMenu.displayName = 'SubMenu'
export default SubMenu