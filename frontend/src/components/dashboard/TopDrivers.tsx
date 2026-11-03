import { UserGroup } from 'lucide-react'

interface TopDriversProp {
    results: {
        position: number;
        driver: string;
        team: string;
        points: number;
    }[];
}

export default function TopDrivers({ results }: TopDriversProp) {
    const maxPoints = Math.max(results[0].points, results[1].points, results[2].points, 1)

    return (
        <div className="relative flex flex-col mt-6 bg-[#191E26] border-2 border-[#252932] rounded-xl py-2 pl-1">
            <div className="pt-4 pr-4 pl-4 flex flex-row items-center gap-8">
                <UserGroup size={64} color="red"/>
                <div className="text-2xl font-semibold text-zinc-400">TOP DRIVERS</div>
            </div>
            <div className="p-4 flex flex-row gap-1 items-stretch">
                <div className="flex flex-col flex-1 pl-4 pr-4 justify-between gap-4">
                    <div className="flex flex-row gap-8 items-center">
                        <div className="w-4 text-3xl tabular-nums">{results[0].position}</div>
                        <div className="w-40 shrink-0 text-2xl truncate">{results[0].driver}</div>
                        <div className="flex-1 h-3 rounded-full bg-white overflow-hidden">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-300"
                                style={{ width: `${(results[0].points / maxPoints) * 100}%` }}
                            />
                        </div>
                        <div className="w-16 shrink-0 text-right text-2xl font-bold tabular-nums">{results[0].points}</div>
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <div className="w-4 text-3xl tabular-nums">{results[1].position}</div>
                        <div className="w-40 shrink-0 text-2xl truncate">{results[1].driver}</div>
                        <div className="flex-1 h-3 rounded-full bg-white overflow-hidden">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-blue-900 to-blue-600"
                                style={{ width: `${(results[1].points / maxPoints) * 100}%` }}
                            />
                        </div>
                        <div className="w-16 shrink-0 text-right text-2xl font-bold tabular-nums">{results[1].points}</div>
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <div className="w-4 text-3xl tabular-nums">{results[2].position}</div>
                        <div className="w-40 shrink-0 text-2xl truncate">{results[2].driver}</div>
                        <div className="flex-1 h-3 rounded-full bg-white overflow-hidden">
                            <div 
                                className="h-full rounded-full bg-[#DC0000] bg-gradient-to-r from-red-900 to-red-600"
                                style={{ width: `${(results[2].points / maxPoints) * 100}%` }}
                            />
                        </div>
                        <div className="w-16 shrink-0 text-right text-2xl font-bold tabular-nums">{results[2].points}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}