import React, {useContext}from 'react'
import classNames from 'classnames'
import {menuContext} from './menu'

export interface IMenuItemProps {
    index?: number,
    className?: string,
    style?: React.CSSProperties,
    disabled?: boolean
}
const MenuItem: React.FC<IMenuItemProps> = (props) => {
    const {children, index, className, style, disabled} = props
    const context = useContext(menuContext)
    const classes = classNames('menu-item', className , {
        'is-disabled':  disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        if(context.onSelect && !disabled && typeof index === 'number') {
            context.onSelect(index)
        }
    }
    return <li style={style} className={classes} onClick={handleClick}>{children}</li>

}
MenuItem.displayName = 'menu-item'
export default MenuItem