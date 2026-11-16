"use client";

import { Badge } from "@/components/ui/badge";
import { SingleHouseResponseDto } from "@/types";
import dynamic from "next/dynamic";
import { ColumnDef } from "@tanstack/react-table";

const HousesTableWrapper = dynamic(
    () => import("./houses-table-wrapper").then(mod => ({ default: mod.HousesTableWrapper })),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-96">Se încarcă...</div>,
    }
);

export function HousesList() {

    const columns: ColumnDef<SingleHouseResponseDto>[] = [
        {
            accessorKey: "name",
            header: () => (
                <div className="text-center text-base font-semibold">
                    Nume
                </div>
            ),
            cell: ({ row }) => (
                <div className="text-center text-base font-medium">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "inventory",
            header: () => (
                <div className="text-center text-base font-semibold">
                    Inventar
                </div>
            ),
            cell: ({ row }) => (
                <div className="text-center text-base font-medium">
                    {row.getValue("inventory")}
                </div>
            ),
        },
        {
            accessorKey: "taxPrice",
            header: () => (
                <div className="text-center text-base font-semibold">
                    Impozit
                </div>
            ),
            cell: ({ row }) => (
                <div className="text-center text-base font-medium">
                    {row.getValue("taxPrice")} $
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: () => (
                <div className="text-center text-base font-semibold">
                    Preț
                </div>
            ),
            cell: ({ row }) => (
                <div className="text-center text-base font-medium">
                    {row.getValue("price")} $
                </div>
            ),
        },
        {
            accessorKey: "isOccupied",
            header: () => (
                <div className="text-center text-base font-semibold">
                    Status
                </div>
            ),
            cell: ({ row }) => {
                const isOccupied = row.getValue("isOccupied") as boolean;
                return (
                    <div className="flex justify-center">
                        <Badge
                            variant={isOccupied ? "destructive" : "default"}
                            className={`text-base px-3 py-1 ${isOccupied ? "hover:bg-red-600" : "bg-green-500 hover:bg-green-600 text-white"}`}
                        >
                            {isOccupied ? "Ocupată" : "Liberă"}
                        </Badge>
                    </div>
                );
            },
        },
    ];

    return (
        <HousesTableWrapper columns={columns} />
    );
}

