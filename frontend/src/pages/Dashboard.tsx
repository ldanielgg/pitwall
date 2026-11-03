import SummaryCard from "../components/dashboard/SummaryCard"
import { CalendarDays, Flag, Trophy, Icon } from 'lucide-react'
import { motorRacingHelmet } from "@lucide/lab"

export default function Dashboard() {
    return (
        <main className="flex-1 min-h-screen bg-[#111318] text-white p-8">
            <h1 className="text-6xl font-semibold">Dashboard</h1>
            <h2 className="text-2xl text-zinc-400">Formula 1 data and race overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4">
                <SummaryCard title="seasons" value="2018 - 26" description="8 seasons available" icon={<CalendarDays size={64} color="red" />} />
                <SummaryCard title="races" value="421" description="Total races" icon={<Flag size={64} color="red" />} />
                <SummaryCard title="drivers" value="20" description="Active in this period" icon={<Icon iconNode={motorRacingHelmet} size={64} color="red" />} />
                <SummaryCard title="championships" value="8" description="Constructors" icon={<Trophy size={64} color="gold" />} />
            </div>
        </main>
    )
}