"use client";

import { TableWrapper } from "@/components/custom/table";
import { findAllHouses } from "@/controller/house";
import { SingleHouseResponseDto } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { houseFilterSpec } from "@/lib/filters/specs/house-filter-spec";
import { Badge } from "@/components/ui/badge";

interface HousesTableWrapperProps {
    columns: ColumnDef<SingleHouseResponseDto>[];
}

export function HousesTableWrapper({ columns }: HousesTableWrapperProps) {
    return (
        <TableWrapper
            columns={columns}
            getData={findAllHouses}
            initialTableState={{
                pagination: {
                    pageIndex: 0,
                    pageSize: 10,
                },
            }}
        />
    );
}
