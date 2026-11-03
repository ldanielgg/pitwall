export interface DriverLapData {
    lapNumbers: number[];
    lapTimes: (number | null)[];
}

export interface RaceLapData {
    ANT: DriverLapData;
    HAM: DriverLapData;
    VER: DriverLapData;
}