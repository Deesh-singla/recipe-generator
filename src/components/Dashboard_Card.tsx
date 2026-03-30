import { LucideIcon } from "lucide-react"

type Props = {
    heading: string
    Icon: LucideIcon
}

const Dashboard_Card = ({ heading, Icon }: Props) => {
    return (
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
            <div className="p-2.5 bg-green-100 rounded-lg shrink-0">
                <Icon className="text-green-600" size={18} />
            </div>
            <div>
                <p className="text-xs text-gray-500">{heading}</p>
                <h2 className="text-lg font-semibold text-gray-800 leading-tight">{0}</h2>
            </div>
        </div>
    )
}

export default Dashboard_Card