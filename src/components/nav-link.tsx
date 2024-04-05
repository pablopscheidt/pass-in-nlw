import { ComponentProps } from "react"

interface NavLinkProps
    extends ComponentProps<'a'> 
{
    children: string
}

export function NavLink({children, ...props}: NavLinkProps) {
    return (
        <a href={props.href} {...props} className='font-medium text-sm'>{children}</a>
    )
}