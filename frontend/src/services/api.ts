const API_BASE_URL = "http://127.0.0.1:8000/api";

export type Season = {
    season: string;
    url: string;
};

export type SeasonsResponse = {
    MRData: {
        SeasonTable: {
            Seasons: Season[];
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