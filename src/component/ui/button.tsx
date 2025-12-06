"use client"

import * as React from "react"

type Variant = "default" | "ghost" | "outline" | "secondary" | "destructive"
type Size = "sm" | "md" | "lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: Size
    asChild?: boolean
}

/**
 * Simple className join helper to avoid an external dependency.
 */
function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ")
}

const VARIANT_CLASSES: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:opacity-95",
    ghost: "bg-transparent hover:bg-muted/50",
    outline: "border border-border bg-background hover:bg-muted",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-95",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-95",
}

const SIZE_CLASSES: Record<Size, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", children, ...props }, ref) => {
        const classes = cx(
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
            VARIANT_CLASSES[variant],
            SIZE_CLASSES[size],
            className
        )

        return (
            <button ref={ref} className={classes} {...props}>
                {children}
            </button>
        )
    }
)

Button.displayName = "Button"