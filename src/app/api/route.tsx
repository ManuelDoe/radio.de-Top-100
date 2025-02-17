import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get('stationId');

    if (stationId) {
        // Einzelne Station abrufen
        try {
            const response = await fetch(`https://prod.radio-api.net/stations/details?stationIds=${stationId}`, {
                headers: {
                    'Accept-Language': 'de-DE'
                }
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Stationsdaten');
            }

            const data = await response.json();
            return NextResponse.json(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Stationsdaten:', error);
            return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
        }
    } else {
        // Liste der Stationen abrufen (bestehender Code)
        try {
            const response = await fetch('https://prod.radio-api.net/stations/list-by-system-name?systemName=STATIONS_TOP&count=100', {
                headers: {
                    'Accept-Language': 'de-DE'
                }
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Daten von der externen API');
            }

            const data = await response.json();

            if (!data.playables || !Array.isArray(data.playables)) {
                throw new Error('Unerwartetes Datenformat von der externen API');
            }

            return NextResponse.json(data);
        } catch (error) {
            console.error('Fehler in der API-Route:', error);
            return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
        }
    }
}
