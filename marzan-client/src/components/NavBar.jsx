import { Navlink } from "react-router-dom";

const links = [
    { Label: 'Home', to: '/' },
    { Label: 'About', to: '/about' },
    { Label: 'Article', to: '/article' },
];

const navLinkClassName = ({ isActive }) => 
    [
        'rounder-full boarder-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
        isActive
        ? 'boarder-zinc-900 bg-zinc-900 text-zinc-50'
        : 'boarder-zinc-50 bg-zinc-50 text-zinc-900 hover:-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
    ].join(' ');

    const NavBar = () => {
        return (
            <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc- 100/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <NavLink to="/" className="flex item-center gap-3">

                 <div className="space-y-0.5">
                    <p className="text-xl font-bold text-zinc-900">LOGO HERE</p>
                    </div>
                </NavLink>

                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <Navlink key={link.to} to={link.to} end={link.to === '/'}
            className={navLinkClassName}>
                            {link.Label}
                        </Navlink>
                    ))}
                </nav>
                </div>
                </header>
        );
    };

    export default NavBar;