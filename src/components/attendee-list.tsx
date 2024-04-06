import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

export function AttendeeList() {
    const [search, setSearch] = useState<string>(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? ''
        }

        return ''
    })

    const [page, setPage] = useState<number>(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }

        return 1
    })
    
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [total, setTotal] = useState<number>(0)

    const totalPages = total / 10

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

        url.searchParams.set('pageIndex', String(page - 1))

        if (search.length > 0) {
            url.searchParams.set('query', search)
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAttendees(data.attendees)
                setTotal(data.total)
            })
    }, [page, search])

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())

        url.searchParams.set('search', search)

        window.history.pushState({}, "", url)

        setSearch(search)
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())

        url.searchParams.set('page', String(page))

        window.history.pushState({}, "", url)

        setPage(page)
    }

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function nextPage() {
        setCurrentPage(page + 1)
    }

    function prevPage() {
        setCurrentPage(page - 1)   
    }

    function firstPage() {
        setCurrentPage(1)   
    }

    function lastPage() {
        setCurrentPage(totalPages)   
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
                        value={search}
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
                    {attendees.map((attendee)=>{
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
                                <TableCell>
                                    {attendee.checkedInAt === null 
                                        ? <span className="text-zinc-500">Não fez check-in</span>
                                        : dayjs().to(attendee.checkedInAt)
                                    }
                                </TableCell>
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
                            Mostrando {attendees.length} de {total} itens
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
                                        disabled={page === Math.ceil(totalPages)}
                                    >
                                        <ChevronRight className="size-4" />
                                    </IconButton>

                                    <IconButton 
                                        onClick={lastPage}
                                        disabled={page === Math.ceil(totalPages)}
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