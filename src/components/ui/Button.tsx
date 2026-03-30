import { cn } from "@/src/lib/utils";
import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    icon?: ReactNode;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

const variantStyles = {
    primary: "bg-green-500 text-white hover:bg-green-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
};

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export default function Button({
    children,
    onClick,
    variant = "primary",
    size = "md",
    icon,
    className,
    disabled,
    type = "button",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 rounded-lg font-medium transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {children}
        </button>
    );
}