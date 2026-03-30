"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    ChefHat,
    Utensils,
    Book,
    Calendar,
    ShoppingCart,
} from "lucide-react";
import { NavLink } from "../types/types";

const iconMap = {
    home: Home,
    chefhat: ChefHat,
    utensils: Utensils,
    book: Book,
    calendar: Calendar,
    shoppingcart: ShoppingCart,
};

export default function NavLinks({ navLinks }: { navLinks: NavLink[] }) {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link: NavLink, i: number) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={i}
                        href={link.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                        ${isActive
                                ? "bg-green-100 text-green-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <Icon size={16} />
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}