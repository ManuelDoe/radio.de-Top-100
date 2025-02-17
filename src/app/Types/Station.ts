export interface Station {
    id: string;
    name: string;
    lastModified: number;
    logo44x44: string;
    logo100x100: string;
    logo175x175: string;
    logo300x300: string;
    logo630x630: string;
    logo1200x1200: string;
    logo2160x2160: string;
    strikingColor1: string;
    strikingColor2: string;
    hasValidStreams: boolean;
    streams: {
        url: string;
        contentFormat: string;
        status: string;
    }[];
    city: string;
    country: string;
    topics: string[];
    genres: string[];
    type: string;
    shortDescription?: string;
    description?: string;
}
