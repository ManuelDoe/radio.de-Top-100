import { columns, StationsData } from "./columns"
import { DataTable } from "./data-table"
import { Station } from "@/app/Types/Station"

async function getStations(): Promise<StationsData[]> {
    try {
        const response = await fetch('https://prod.radio-api.net/stations/list-by-system-name?systemName=STATIONS_TOP&count=100', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();
        return data.playables.map((station: Station) => ({
            id: station.id,
            name: station.name,
            logo100x100: station.logo100x100,
            city: station.city,
            country: station.country,
            topics: station.topics || []
        }));
    } catch (error) {
        console.error('Fehler beim Abrufen der Stationen:', error);
        return [];
    }
}

export default async function StationsPage() {
    const data = await getStations()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
