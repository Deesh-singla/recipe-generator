import {
    ChefHat,
    Settings,
} from "lucide-react";

import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import UserProfile from "./UserProfile";

export default function Header() {
    const navLinks = [
        { name: "Dashboard", href: "/dashboard", icon: "home" },
        { name: "Pantry", href: "/pantry", icon: "utensils" },
        { name: "Generate", href: "/generate", icon: "chefhat" },
        { name: "Recipes", href: "/recipes", icon: "book" },
        { name: "Shopping", href: "/shopping", icon: "shoppingcart" },
    ];

    return (
        <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-xl shadow-sm">
                        <ChefHat className="text-green-600 w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight">
                        AI Recipe Generator
                    </span>
                </div>

                <NavLinks navLinks={navLinks} />

                <div className="hidden md:flex items-center gap-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <Settings className="text-gray-500" />
                    </button>

                    <UserProfile />
                </div>

                <MobileMenu navLinks={navLinks} />
            </div>
        </header>
    );
}

// import {
//     ChefHat,
//     Settings,
// } from "lucide-react";

// import NavLinks from "./NavLinks";
// import MobileMenu from "./MobileMenu";
// import UserProfile from "./UserProfile";

// export default function Header() {
//     const navLinks = [
//         { name: "Dashboard", href: "/dashboard", icon: "home" },
//         { name: "Pantry", href: "/pantry", icon: "utensils" },
//         { name: "Generate", href: "/generate", icon: "chefhat" },
//         { name: "Recipes", href: "/recipes", icon: "book" },
//         { name: "Meal Plan", href: "/meal-plan", icon: "calendar" },
//         { name: "Shopping", href: "/shopping", icon: "shoppingcart" },
//     ];

//     return (
//         <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">

//                 {/* Logo */}
//                 <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                     <div className="bg-green-100 p-2 rounded-xl shadow-sm">
//                         <ChefHat className="text-green-600 w-5 h-5" />
//                     </div>
//                     <span className="font-semibold text-sm sm:text-lg tracking-tight truncate">
//                         AI Recipe Generator
//                     </span>
//                 </div>

//                 {/* Desktop Nav */}
//                 <NavLinks navLinks={navLinks} />

//                 {/* Desktop Right */}
//                 <div className="hidden md:flex items-center gap-4">
//                     <button className="p-2 rounded-lg hover:bg-gray-100">
//                         <Settings className="text-gray-500" />
//                     </button>

//                     <UserProfile />
//                 </div>

//                 {/* Mobile Menu */}
//                 <MobileMenu navLinks={navLinks}>
//                     <UserProfile />
//                 </MobileMenu>
//             </div>
//         </header>
//     );
// }