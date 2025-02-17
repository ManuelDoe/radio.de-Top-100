"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from 'next/link'

export interface StationsData {
    id: string;
    name: string;
    logo100x100: string;
    city: string;
    country: string;
    topics?: string[];
    genres: string[];
}

export const columns: ColumnDef<StationsData>[] = [
    {
        accessorKey: "logo100x100",
        header: "",
        cell: ({ row }) => {
            const station = row.original;
            const value = row.getValue('logo100x100') as string;
            const valueName = row.getValue('name') as string;
            return(
                <Link href={`/${station.id}`} className="flex items-center justify-center">
                    <Image src={value} alt={valueName} width={100} height={100} className="rounded-lg hover:scale-[1.05] transition-all duration-300"/>
                </Link>
            )
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="font-bold max-md:text-base text-xl text-[#50cd32]">Sendername</div>,
        cell: ({ row }) => {
            const station = row.original;
            return (
                <Link href={`/${station.id}`} className="hover:text-[#50cd32] underline transition-all duration-300 text-lg">
                    {station.name}
                </Link>
            );
        }
    },
    {
        accessorKey: "genres",
        header: () => <div className="font-bold max-md:text-base text-xl text-[#50cd32]">Genres</div>,
        filterFn: (row, columnId, filterValue) => {
            const genres = row.getValue(columnId) as string[] | undefined;
            return genres?.some(genre =>
                genre.toLowerCase().includes((filterValue as string).toLowerCase())
            ) ?? false;
        },
        cell: ({ row }) => {
            const genres = row.getValue('genres') as string[] | undefined;
            return (
                <div className="text-lg">
                    {genres?.join(', ') ?? 'No genre defined'}
                </div>
            );
        }
    },
]
