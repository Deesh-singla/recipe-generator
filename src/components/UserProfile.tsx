// 'use server'
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
// import LogoutButton from "./LogoutButton";

// export default async function UserProfile() {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) return null;

//     const name = session.user.name || "User";
//     const email = session.user.email || "";
//     const initial = name.charAt(0).toUpperCase();

//     return (
//         <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
//             <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium">
//                 {initial}
//             </div>

//             <div className="flex flex-col leading-tight">
//                 <span className="text-sm font-medium text-gray-800">
//                     {name}
//                 </span>
//                 <span className="text-xs text-gray-500">
//                     {email}
//                 </span>
//             </div>

//             <LogoutButton />
//         </div>
//     );
// }

'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import LogoutButton from "./LogoutButton";

export default async function UserProfile() {
    const session = await getServerSession(authOptions);

    if (!session?.user) return null;

    const name = session.user.name || "User";
    const email = session.user.email || "";
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className="flex items-center gap-2 bg-gray-50 px-2 py-2 rounded-lg w-full">
            <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium shrink-0">
                {initial}
            </div>

            <div className="flex flex-col leading-tight overflow-hidden">
                <span className="text-sm font-medium text-gray-800 truncate">
                    {name}
                </span>
                <span className="text-xs text-gray-500 truncate">
                    {email}
                </span>
            </div>

            <LogoutButton />
        </div>
    );
}