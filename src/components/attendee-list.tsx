import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const totalPages = attendees.length / 10

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function nextPage() {
        setPage(page + 1)   
    }

    function prevPage() {
        setPage(page - 1)   
    }

    function firstPage() {
        setPage(1)   
    }

    function lastPage() {
        setPage(totalPages)   
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>

                <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-4 text-orange-400" />

                    <input 
                        type="text" 
                        placeholder="Buscar participante..." 
                        className="bg-transparent flex-1 outline-none !ring-0 border-0 p-0 text-sm"
                        onChange={onSearchInputChange}
                    />
                </div>
            </div>

            <Table>
                <thead>
                    <TableRow>
                        <TableHeader style={{width: 48}}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data de check-in</TableHeader>
                        <TableHeader style={{width: 64}}></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee)=>{
                        return (
                            <TableRow key={attendee.id} className="hover:bg-white/5">
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">
                                            {attendee.name}
                                        </span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
                            Mostrando {page * 10} de {attendees.length} itens
                        </td>
                        <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                            <div className="inline-flex items-center gap-8">
                                <span>Pagina {page} de {Math.ceil(totalPages)}</span>

                                <div className="flex gap-1.5">
                                    <IconButton 
                                        onClick={firstPage} 
                                        disabled={page === 1}
                                    >
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>

                                    <IconButton 
                                        onClick={prevPage}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft className="size-4" />
                                    </IconButton>

                                    <IconButton 
                                        onClick={nextPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronRight className="size-4" />
                                    </IconButton>

                                    <IconButton 
                                        onClick={lastPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}