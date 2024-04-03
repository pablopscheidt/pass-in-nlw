import uniteIcon from '../assets/unite-logo.svg'

export function Header() {
    return (
        <div className='flex items-center gap-5 py-2'>
            <img src={uniteIcon} alt="NLW Unite Logo" />

            <nav className='flex items-center gap-5'>
                <a href="" className='font-medium text-sm text-zinc-400'>Eventos</a>
                <a href="" className='font-medium text-sm'>Participantes</a>
            </nav>
        </div>
    )
}