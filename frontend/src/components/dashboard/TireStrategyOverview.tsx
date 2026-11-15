import { Icon } from 'lucide-react'
import { tire } from '@lucide/lab'
import { PieChart, pieClasses } from '@mui/x-charts/PieChart';

const size = {
  width: 320,
  height: 160,
};

export default function TopDrivers() {
    return (
        <div className="relative flex flex-col mt-6 bg-gradient-to-b from-zinc-950 to-gray-900 border-[1.6px] border-[#191d21] rounded-xl py-2 pl-1">
            <div className="pt-4 pr-4 pl-4 flex flex-row items-center gap-8">
                <Icon iconNode={tire} size={51} color="red"/>
                <div className="text-2xl font-semibold text-zinc-400">TIRE STRATEGY OVERVIEW</div>
            </div>
            <div className="p-4 flex flex-row gap-1 items-stretch">
                <PieChart
                    {...size}
                    series={[
                        {
                            innerRadius: 56,
                            outerRadius: 80,
                            cornerRadius: 3,
                            paddingAngle: 4,
                            data: [
                                { id: 0, value: 42, label: 'Soft', color: '#E10600'},
                                { id: 1, value: 36, label: 'Medium', color: '#FFD100'},
                                { id: 2, value: 22, label: 'Hard', color: '#FFFFFF'},
                            ],
                        },
                    ]}
                    slotProps={{
                        legend: {
                            sx: {
                                "& .MuiChartsLegend-label": {
                                    fontSize: 19,
                                    fontWeight: 500,
                                    fill: '#D1D5DB',
                                },
                                "& .MuiChartsLegend-mark": { width: 26 },
                                gap: 3.2,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}