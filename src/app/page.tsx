import {DataTable} from "@/app/components/table/data-table";
import {columns} from "@/app/components/table/columns";
import {getStations} from "@/lib/StationsCache";

export default async function Home() {
    const stations = await getStations();

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#50cd32]">radio.de Top 100</h1>
            <DataTable columns={columns} data={stations}/>
        </main>
    );
}
