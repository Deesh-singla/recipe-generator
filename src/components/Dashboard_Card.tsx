import { LucideIcon } from "lucide-react"

type Props = {
    heading: string
    value: string | number
    description: string
    Icon: LucideIcon
    tone?: "green" | "blue" | "amber" | "rose"
}

const toneClasses = {
    green: {
        icon: "bg-emerald-100 text-emerald-700",
        value: "text-emerald-700",
    },
    blue: {
        icon: "bg-sky-100 text-sky-700",
        value: "text-sky-700",
    },
    amber: {
        icon: "bg-amber-100 text-amber-700",
        value: "text-amber-700",
    },
    rose: {
        icon: "bg-rose-100 text-rose-700",
        value: "text-rose-700",
    },
};

const Dashboard_Card = ({ heading, value, description, Icon, tone = "green" }: Props) => {
    const classes = toneClasses[tone];

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">{heading}</p>
                    <h2 className={`mt-3 text-3xl font-bold leading-none ${classes.value}`}>{value}</h2>
                    <p className="mt-3 text-sm text-gray-500">{description}</p>
                </div>
                <div className={`rounded-2xl p-3 shrink-0 ${classes.icon}`}>
                    <Icon size={22} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard_Card
