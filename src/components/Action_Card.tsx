import { LucideIcon } from "lucide-react"
import Link from "next/link"

type Props = {
    title: string,
    description: string,
    Icon: LucideIcon,
    href:string
}

const Action_Card = ({ title, description, Icon ,href}: Props) => {
    return (
        <Link href={href} className="group flex items-center gap-4 border border-gray-200 bg-white rounded-xl p-6 cursor-pointer transition-colors duration-150 hover:bg-green-100 hover:border-green-200">
            <div className="p-3 rounded-lg transition-colors duration-150 bg-green-200">
                <Icon size={18} className="transition-colors duration-150 text-green-700" />
            </div>

            <div>
                <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </Link>
    )
}

export default Action_Card