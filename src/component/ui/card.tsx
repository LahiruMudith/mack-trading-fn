"use client"

import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType
}

/**
 * Minimal Card wrapper used across the shop pages.
 * - Supports passing className to extend styles.
 * - Uses forwardRef so it can be focused or measured by parent components.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", children, as: Comp = "div", ...props }, ref) => {
    const classes = [
        "rounded-lg",
        "bg-card",
        "border",
        "border-border",
        "shadow-sm",
        "overflow-hidden",
        className,
    ].filter(Boolean).join(" ")

    return (
        // using a polymorphic `as` prop lets you render a link or button if needed
        // but default is a div which fits most card use-cases.
        <Comp ref={ref as any} className={classes} {...props}>
            {children}
        </Comp>
    )
})

Card.displayName = "Card"