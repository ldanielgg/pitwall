import SummaryCard from "../components/dashboard/SummaryCard"
import { CalendarDays, Flag, Trophy, Icon } from 'lucide-react'
import { motorRacingHelmet } from "@lucide/lab"
import CurrentRace from "../components/dashboard/CurrentRace"
import { useState, useEffect } from "react"
import LapTimeTrend from "../components/dashboard/LapTimeTrend"
import type { RaceLapData } from "../types/race"
import TopDrivers from "../components/dashboard/TopDrivers"

const initialRace = {
    title: "Mexico City Grand Prix",
    country: "Mexico",
    countryCode: "MX",
    location: "Mexico City",
    date: "2026-11-1",
    results: [
        { position: 1, driver: "Verstappen", team: "Red Bull", time: "2:20:28.772", gap: null },
        { position: 2, driver: "Hamilton", team: "Ferrari", time: "2:20:29.571", gap: "0.799"},
        { position: 3, driver: "Antonelli", team: "Mercedes", time: "2:20:32.778", gap: "4.006" }
    ]
};

const driverChampionship = {
    results: [
        { position: 1, driver: "Antonelli", team: "Mercedes", points: 380 },
        { position: 2, driver: "Verstappen", team: "Red Bull", points: 261 },
        { position: 3, driver: "Hamilton", team: "Ferrari", points: 259 }
    ]
};

export default function Dashboard() {
    const [selectedRace, setSelectedRace] = useState(initialRace);
    const [raceData, setRaceData] = useState<RaceLapData | null>(null)
    const [topDrivers, setTopDrivers] = useState(driverChampionship)

    useEffect(() => {
        async function fetchRaceData() {
            const response = await fetch("/race_data.json");
            const data: RaceLapData = await response.json();

            setRaceData(data);
        }

        fetchRaceData();
    }, []);

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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4">
                <CurrentRace race={selectedRace} image="https://www.racefans.net/wp-content/uploads/2026/11/racefansdotnet-24-11-02-00-47-07-3-SI202611010505.jpg" />
                {raceData && <LapTimeTrend raceData={raceData} />}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4">
                <TopDrivers results={topDrivers.results} />
            </div>
        </main>
    )
}