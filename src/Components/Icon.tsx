import { FC } from "react"

export const Icon: FC<IconI> = ({ icon, className, ...rest }) => {
    return <i className={`bi bi-${icon} ${className}`} {...rest}></i>
}
