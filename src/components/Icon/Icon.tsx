import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IIconProps extends FontAwesomeIconProps {
    className?: string,
    theme?: ThemeProps
}
const Icon: React.FC<IIconProps> = ({className,theme, ...restProps}) => {
    const classes = classNames('viking-icon', className, {
        [`icon-${theme}`]: theme
    })
    return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
} 

export default Icon