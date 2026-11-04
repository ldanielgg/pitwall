import { Timer } from 'lucide-react'
import { LineChart } from '@mui/x-charts';
import type { RaceLapData } from '../../types/race';

interface LapTimeTrendProps {
    raceData: RaceLapData;
}

export default function LapTimeTrend({ raceData }: LapTimeTrendProps) {
    const allLapTimes = [
        ...raceData.ANT.lapTimes,
        ...raceData.HAM.lapTimes,
        ...raceData.VER.lapTimes,
    ].filter((time): time is number => time !== null);

    const sortedLapTimes = [...allLapTimes].sort((a, b) => a - b);

    const lowerBound = sortedLapTimes[Math.floor(sortedLapTimes.length * 0.25)];
    const upperBound = sortedLapTimes[Math.floor(sortedLapTimes.length * 0.75)];

    return (
        <div className="relative flex flex-col mt-6 bg-gradient-to-b from-zinc-950 to-gray-900 border-2 border-[#191d21] rounded-xl py-2 pl-1">
            <div className="pt-4 pr-4 pl-4 flex flex-row items-center gap-8">
                <Timer size={64} color="red"/>
                <div className="text-2xl font-semibold text-zinc-400">LAP TIME TREND</div>
            </div>
            <div className="pl-4 pr-4 pb-4 flex">
                <LineChart
                    xAxis={[
                        {
                            data: raceData.ANT.lapNumbers,
                            label: "Lap Number",
                            tickLabelStyle: {
                                fill: '#black',
                                fontSize: 14
                            },
                        },
                    ]}
                    series={[
                        {
                            label: "Antonelli",
                            data: raceData.ANT.lapTimes,
                        },
                        {
                            label: "Hamilton",
                            data: raceData.HAM.lapTimes,
                        },
                        {
                            label: "Verstappen",
                            data: raceData.VER.lapTimes,
                        },
                    ]}
                    yAxis={[
                        {
                            min: lowerBound - 1,
                            max: upperBound + 1,
                            label: "Lap Time (seconds)",
                            tickLabelStyle: {
                                fill: '#9CA3AF',
                                fontSize: 14
                            }
                        },
                    ]}
                    slotProps={{
                        legend: {
                            sx: { fontSize: 16, fontWeight: 600 },
                        }
                    }}
                    grid={{
                        horizontal: true,
                        vertical: true,
                    }}
                    height={400}
                />
            </div>
        </div>
    );
}