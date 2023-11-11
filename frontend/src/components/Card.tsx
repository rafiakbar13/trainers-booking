import { CardProps } from "../types/Card"
const Card = ({ children, className }: CardProps) => {
    return (
        <article className={`rounded-xl text-base ${className}`}>
            {children}
        </article>
    )
}

export default Card