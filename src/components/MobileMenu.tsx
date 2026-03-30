"use client";

import { useState } from "react";
import Link from "next/link";
import { Book, Calendar, ChefHat, Home, Menu, ShoppingCart, Utensils, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavLink } from "../types/types";

type Props = {
    navLinks: NavLink[];
};

const iconMap = {
    home: Home,
    chefhat: ChefHat,
    utensils: Utensils,
    book: Book,
    calendar: Calendar,
    shoppingcart: ShoppingCart,
};

export default function MobileMenu({ navLinks }: Props) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="md:hidden">
            <button
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setOpen(!open)}
            >
                {open ? <X /> : <Menu />}
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Slide-in drawer from the right */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-1.5 rounded-lg">
                            <ChefHat className="text-green-600 w-4 h-4" />
                        </div>
                        <span className="font-semibold text-sm">AI Recipe Generator</span>
                    </div>
                    <button
                        className="p-1.5 rounded-lg hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 px-3 py-4">
                    {navLinks.map((link, i) => {
                        const Icon = iconMap[link.icon as keyof typeof iconMap];
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={i}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-green-100 text-green-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            {/* <UserProfile/> */}
        </div>
    );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//     Book,
//     Calendar,
//     ChefHat,
//     Home,
//     Menu,
//     ShoppingCart,
//     Utensils,
//     X,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { NavLink } from "../types/types";

// type Props = {
//     navLinks: NavLink[];
//     children?: React.ReactNode;
// };

// const iconMap = {
//     home: Home,
//     chefhat: ChefHat,
//     utensils: Utensils,
//     book: Book,
//     calendar: Calendar,
//     shoppingcart: ShoppingCart,
// };

// export default function MobileMenu({ navLinks, children }: Props) {
//     const [open, setOpen] = useState(false);
//     const pathname = usePathname();

//     return (
//         <div className="md:hidden flex-shrink-0">
//             <button
//                 className="p-2 rounded-lg hover:bg-gray-100"
//                 onClick={() => setOpen(!open)}
//             >
//                 {open ? <X /> : <Menu />}
//             </button>

//             {/* Backdrop */}
//             {open && (
//                 <div
//                     className="fixed inset-0 bg-black/40 z-40"
//                     onClick={() => setOpen(false)}
//                 />
//             )}

//             {/* Drawer */}
//             {/* Drawer */}
//             <div
//                 className={`fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white shadow-xl z-[60] 
//     flex flex-col   {/* ← ADD THIS */}
//     transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
//                     }`}
//             >
//                 {/* Header — stays fixed at top */}
//                 <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 flex-shrink-0">
//                     ...
//                 </div>

//                 {/* Links — takes remaining space and scrolls */}
//                 <nav className="flex flex-col gap-1 px-3 py-4 overflow-y-auto flex-1">
//                     ...
//                 </nav>

//                 {/* User Profile — pinned to bottom */}
//                 <div className="border-t px-3 py-4 flex-shrink-0">
//                     {children}  {/* UserProfile already has w-full, this is fine */}
//                 </div>
//             </div>
//         </div>
//     );
// }