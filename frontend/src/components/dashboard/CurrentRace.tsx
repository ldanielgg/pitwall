import { ChartNoAxesCombined } from 'lucide-react'
import ReactCountryFlag from "react-country-flag"

interface CurrentRaceProps {
    race: {
        title: string;
        country: string;
        countryCode: string;
        location: string;
        date: string;
        results: {
            position: number;
            driver: string;
            team: string;
            time: string;
            gap: string | null;
        }[];
    },
    image: string;
}

export default function CurrentRace({ race, image }: CurrentRaceProps) {

    return (
        <div className="relative flex flex-col mt-6 bg-[#191E26] border-2 border-[#252932] rounded-xl py-2 pl-1">
            <div className="pt-4 pr-4 pl-4 flex flex-row items-center gap-8">
                <ChartNoAxesCombined size={64} color="red"/>
                <div className="text-2xl font-semibold text-zinc-400">CURRENT RACE</div>
            </div>
            <div className="p-4 flex flex-col gap-1">
                <div className="text-4xl font-semibold">{race.date.slice(0, 4)} {race.title}</div>
                    <div className="flex flex-row items-center gap-4">
                        <ReactCountryFlag 
                        countryCode={race.countryCode} 
                        svg
                        style={{
                            width: '3em',
                            height: '2em',
                            borderRadius: '6px',
                            objectFit: 'cover'
                        }}
                        title={race.country}
                    />
                    <div className="text-2xl text-zinc-400">{race.location}, {race.country}</div>
                    <div className="text-2xl text-zinc-400">{race.date}</div>
                </div>
            </div>
            <div className="pl-4 pr-4 pb-4 flex flex-row gap-1 items-stretch">
                <div className="w-55/100">
                    <img src={image} className="rounded-xl aspect-16/9 object-cover"/>
                </div>
                <div className="flex flex-col flex-1 pl-4 pr-4 justify-between">
                    <div className="flex flex-row gap-8 items-center">
                        <div className="text-3xl font-semibold">{race.results[0].position}</div>
                        <div className="flex flex-col">
                            <div className="text-2xl font-semibold">{race.results[0].driver}</div>
                            <div className="text-xl font-normal text-zinc-400">{race.results[0].team}</div>
                        </div>
                        <div className="flex items-end ml-auto">
                            <div className="text-2xl">{race.results[0].time}</div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <div className="text-3xl font-semibold">{race.results[1].position}</div>
                        <div className="flex flex-col">
                            <div className="text-2xl font-semibold">{race.results[1].driver}</div>
                            <div className="text-xl font-normal text-zinc-400">{race.results[1].team}</div>
                        </div>
                        <div className="flex items-end ml-auto">
                            <div className="text-2xl">+{race.results[1].gap}</div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <div className="text-3xl font-semibold">{race.results[2].position}</div>
                        <div className="flex flex-col">
                            <div className="text-2xl font-semibold">{race.results[2].driver}</div>
                            <div className="text-xl font-normal text-zinc-400">{race.results[2].team}</div>
                        </div>
                        <div className="flex items-end ml-auto">
                            <div className="text-2xl">+{race.results[2].gap}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}