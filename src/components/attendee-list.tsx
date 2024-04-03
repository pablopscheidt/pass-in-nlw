import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";

export function AttendeeList() {
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
                    />
                </div>
            </div>

            <div className="border border-white/10 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th style={{width: 48}} className="py-3 px-4 text-sm font-semibold text-left">
                                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Código</th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Participantes</th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Data de inscrição</th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Data de check-in</th>
                            <th style={{width: 64}} className="py-3 px-4 text-sm font-semibold text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 8 }).map((_, index)=>{
                            return (
                                <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">12356</td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-white">
                                                Pablo Boing Pscheidt
                                            </span>
                                            <span>pablobngpscheidt@gmail.com</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">15 dias atrás</td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">5 dias atrás</td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                                            <MoreHorizontal className="size-4" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
                                Mostrando 5 de 253 itens
                            </td>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                                <div className="inline-flex items-center gap-8">
                                    <span>Pagina 1 de 51</span>

                                    <div className="flex gap-1.5">
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronsLeft className="size-4" />
                                        </button>

                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronLeft className="size-4" />
                                        </button>

                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronRight className="size-4" />
                                        </button>

                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronsRight className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}