import { getStationById, getStations } from "@/lib/StationsCache";
import Link from "next/link";
import InfoItem from "@/app/[id]/InfoItem";
import StreamPlayer from "@/app/[id]/StreamPlayer";
import Image from "next/image";
interface GeneratedPageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function StreamDetail({ params }: GeneratedPageProps) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        const cleanId = id.startsWith('@') ? id.slice(1) : id;

        const station = await getStationById(cleanId);

        if (!station) {
            return (
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Station nicht gefunden</h2>
                    <Link href="/" className="text-blue-500 hover:underline">Zurück zur Hauptseite</Link>
                </div>
            );
        }

        const allStations = await getStations();

        const similarStations = allStations
            .filter(s => {
                if (s.id === station.id) return false;
                if (!s.genres || !station.genres) return false;
                return s.genres.some(genre => station.genres.includes(genre));
            })
            .slice(0, 4);

        return (
            <div className="max-w-6xl mx-auto py-12 max-lg:px-2">
                <h1 className="text-4xl font-bold text-[#50cd32] mb-4">{station.name}</h1>
                <div className="flex flex-col md:flex-row gap-2 lg:gap-8">
                    <div className="md:w-1/3 mb-4 md:mb-0 max-lg:flex max-lg:justify-center">
                        {station.logo300x300 && (
                            <Image src={station.logo300x300} alt={station.name} width={400} height={400}
                                   className="rounded-lg max-lg:h-28 max-lg:w-28"/>
                        )}
                    </div>
                    <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
                        <div>
                            <InfoItem label="Stadt" value={station.city}/>
                            <InfoItem label="Genres" value={station.genres}/>
                            <InfoItem value={station.shortDescription}/>
                        </div>
                        {station.streams && station.streams.length > 0 && (
                            <StreamPlayer streamUrl={station.streams[0].url} stationName={station.name}/>
                        )}
                    </div>
                </div>
                <h2 className="text-[#50cd32] text-3xl font-bold my-4 lg:mt-8 lg:mb-4">Über {station.name}</h2>
                <InfoItem value={station.description} className="max-lg:mb-4"/>
                {similarStations.length > 0 ? (
                    <div className="my-6 lg:my-12">
                        <h2 className="text-3xl text-[#50cd32] text-center font-bold my-6 lg:my-12">Ähnliche Sender die Ihnen auch
                            gefallen
                            könnten</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {similarStations.map((similarStation) => (
                                <Link href={`/${similarStation.id}`} key={similarStation.id}
                                      className="text-center hover:text-[#50cd32] group transition-all duration-300">
                                    {similarStation.logo100x100 && (
                                        <Image src={similarStation.logo100x100} alt={similarStation.name} width={100}
                                               height={100}
                                               className="rounded-lg mx-auto group-hover:scale-[1.05] transition-all duration-300"/>
                                    )}
                                    <p className="mt-2">{similarStation.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center mt-6">Keine ähnlichen Sender gefunden.</p>
                )}
                <Link href="/" className="text-[#50cd32] hover:underline mb-4 inline-block">&larr; Zurück zu den Top
                    100</Link>
            </div>
        );
    } catch (error) {
        console.error('Error fetching station data:', error);
        return (
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Fehler beim Laden der Senderdaten</h2>
                <p>Bitte versuchen Sie es später erneut.</p>
                <Link href="/" className="text-[#50cd32] hover:underline mt-4 inline-block">Zurück zu den Top 100</Link>
            </div>
        );
    }
}

export default StreamDetail;
