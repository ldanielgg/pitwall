import { Timer } from 'lucide-react';
import { LineChart, axisClasses } from '@mui/x-charts';
import type { RaceLapData } from '../../types/race';

interface LapTimeTrendProps {
    raceData: RaceLapData;
};

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
        <div className="relative flex flex-col mt-6 bg-gradient-to-b from-zinc-950 to-gray-900 border-[1.6px] border-[#191d21] rounded-xl py-2 pl-1">
            <div className="pt-4 pr-4 pl-4 flex flex-row items-center gap-8">
                <Timer size={51} color="red"/>
                <div className="text-2xl font-semibold text-zinc-400">LAP TIME TREND</div>
            </div>
            <div className="pl-4 pr-4 pb-4 flex">
                <LineChart
                    xAxis={[
                        {
                            data: raceData.ANT.lapNumbers,
                            label: "Lap Number",
                            height: 46,
                            tickLabelStyle: {
                                fill: '#black',
                                fontSize: 11
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
                            width: 52,
                            tickLabelStyle: {
                                fill: '#9CA3AF',
                                fontSize: 11
                            }
                        },
                    ]}
                    slotProps={{
                        legend: {
                            sx: { fontSize: 13, fontWeight: 600 },
                        }
                    }}
                    grid={{
                        horizontal: true,
                        vertical: true,
                    }}
                    height={320}
                    margin={16}
                    sx={{
                        [`& .${axisClasses.label}`]: { fontSize: 11 },
                    }}
                />
            </div>
        </div>
    );
};