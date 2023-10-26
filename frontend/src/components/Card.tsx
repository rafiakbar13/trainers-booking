type CardProps = {
    children: React.ReactNode
    className?: string
    icon?: JSX.Element
}

const Card = ({ children, className }: CardProps) => {
    return (
        <article className={`rounded-xl text-base ${className}`}>
            {children}
        </article>
    )
}

export default Card