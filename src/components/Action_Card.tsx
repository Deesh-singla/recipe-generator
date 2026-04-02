import { LucideIcon } from "lucide-react"
import Link from "next/link"

type Props = {
    title: string,
    description: string,
    Icon: LucideIcon,
    href:string,
    badge?: string
}

const Action_Card = ({ title, description, Icon ,href, badge }: Props) => {
    return (
        <Link href={href} className="group block h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md">
            <div className="flex h-full min-h-[210px] flex-col justify-between gap-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 transition-colors duration-150 group-hover:bg-emerald-200">
                        <Icon size={20} className="transition-colors duration-150 text-emerald-700" />
                    </div>

                    {badge && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {badge}
                        </span>
                    )}
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-500">{description}</p>
                </div>
            </div>
        </Link>
    )
}

export default Action_Card
