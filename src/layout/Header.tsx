import {Link} from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";


const Header = () => {
    return (
        <div data-testid='header-element' className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className='container m-auto'>
                        <div className="mx-2 navbar-start px-2"><Link to='/'>Movie Browser</Link></div>
                        <div className="hidden navbar-center flex-none lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                <li><Link data-testid='movie-link-element' to='/movies'>Movies</Link></li>
                                <li><Link data-testid='tvshow-link-element' to='/tv-shows'>TV Shows</Link></li>
                                <li><Link data-testid='people-link-element' to='/people'>People</Link></li>
                                <li><Link data-testid='more-link-element' to='/more'>More</Link></li>
                            </ul>
                        </div>
                        <div className="navbar-end hidden lg:flex font-dm-sans">
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
            <div data-testid='drawer-element' className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><Link to='/movies'>Movies</Link></li>
                    <li><Link to='/tv-shows'>Tv Shows</Link></li>
                    <li><Link to='/people'>People</Link></li>
                    <li><Link to='/more'>More</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header