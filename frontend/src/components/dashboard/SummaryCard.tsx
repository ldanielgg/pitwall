interface SummaryCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
}

export default function SummaryCard({ title, value, description, icon }: SummaryCardProps) {

    return (
        <div className="relative flex flex-row mt-6 bg-[#191E26] border-2 border-[#252932] rounded-xl py-4">
            <div className="p-4">
                {icon}
            </div>
            <div className="flex flex-col p-4 gap-4">
                <div className="text-2xl text-zinc-400 font-semibold">{title.toLocaleUpperCase()}</div>
                <div className="text-4xl font-semibold">{value}</div>
                <div className="text-xl text-zinc-400">{description}</div>
            </div>
        </div>
    );
}
