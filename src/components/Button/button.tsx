import React,{ ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    large = 'lg',
    small = 'sm'
}
export enum ButtonType {
    Primary= 'primary',
    Default= 'default',
    Danger= 'danger',
    Link = 'link'
}

interface IBaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode;
    href?: string
}
type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
    // eslint-disable-next-line
    console.log('props',props);
    const {className,disabled,size,btnType,children,href,...restProps} = props
    console.log({...restProps})
    // btn btn-lg btn--primary
    const classes = classNames('btn',className, {
        'disabled': btnType === ButtonType.Link && disabled,
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
    })
    if(ButtonType.Link && href) {
        return <a className={classes} href={href} {...restProps}>{children}</a>
    } else {
        return <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}
export default Button
