import {Station} from "@/app/Types/Station";

export async function getStations(): Promise<Station[]> {
    try {
        const response = await fetch('https://prod.radio-api.net/stations/list-by-system-name?systemName=STATIONS_TOP&count=100', {
            headers: {
                'Accept-Language': 'de-DE',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Fehler beim Abrufen der Daten. Status:', response.status);
            return [];
        }

        const data = await response.json();

        if (!data.playables || !Array.isArray(data.playables)) {
            console.error('Unerwartetes Datenformat von der externen API');
            return [];
        }

        const stations: Station[] = data.playables;
        console.log('Verarbeitete Stationen:', stations.length);
        return stations;
    } catch (error) {
        console.error('Fehler beim Abrufen der Stationen:', error);
        return [];
    }
}

export async function getStationById(stationId: string): Promise<Station | null> {
    try {
        const response = await fetch(`https://prod.radio-api.net/stations/details?stationIds=${stationId}`, {
            headers: {
                'Accept-Language': 'de-DE',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Fehler beim Abrufen der Stationsdaten. Status:', response.status);
            return null;
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            console.error('Unerwartetes Datenformat oder keine Station gefunden');
            return null;
        }

        return data[0] as Station;
    } catch (error) {
        console.error('Fehler beim Abrufen der Stationsdaten:', error);
        return null;
    }
}
