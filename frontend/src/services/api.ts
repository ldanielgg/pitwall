const API_BASE_URL = "http://127.0.0.1:8000/api";

export type Season = {
    season: string;
    url: string;
};

export type Race = {
    season: string;
    round: string;
    raceName: string;
    date: string;
    Circuit: {
        circuitId: string;
        circuitName: string;
        Location: {
            locality: string;
            country: string;
        };
    };
};

export type SeasonsResponse = {
    MRData: {
        SeasonTable: {
            Seasons: Season[];
        };
    };
};

export type RacesResponse = {
    MRData: {
        RaceTable: {
            season: string;
            Races: Race[];
        };
    };
};

export const getHealth = async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
        throw new Error("Unable to connect to Pitwall API");
    }

    return response.json();
};

export const getSeasons = async (): Promise<SeasonsResponse> => {
    const response = await fetch(`${API_BASE_URL}/seasons`);
    if (!response.ok) {
        throw new Error("Unable to fetch seasons");
    }

    return response.json();
};

export const getRacesBySeason = async (year: string): Promise<RacesResponse> => {
    const response = await fetch(`${API_BASE_URL}/seasons/${year}`);
    if (!response.ok) {
        throw new Error(`Unable to fetch races for ${year}`)
    }

    return response.json();
};