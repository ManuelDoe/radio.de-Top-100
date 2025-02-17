import { Station } from "@/app/Types/Station";

export async function getStations(): Promise<Station[]> {
    try {
        console.log('Starte Datenabruf...');
        const response = await fetch('http://localhost:3000/api/', {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Fehler beim Abrufen der Daten. Status:', response.status);
            return [];
        }

        const data = await response.json();
        let stations: Station[];

        if (Array.isArray(data)) {
            console.log('Daten sind ein Array mit', data.length, 'Elementen');
            stations = data;
        } else if (data.playables && Array.isArray(data.playables)) {
            console.log('Daten haben ein playables Array mit', data.playables.length, 'Elementen');
            stations = data.playables;
        } else {
            console.error('Unerwartetes Datenformat:', typeof data, Object.keys(data));
            return [];
        }

        console.log('Verarbeitete Stationen:', stations.length);
        return stations;
    } catch (error) {
        console.error('Fehler beim Abrufen der Stationen:', error);
        return [];
    }
}
