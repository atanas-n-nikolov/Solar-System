import { Link } from 'react-router';

export default function Header() {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logoContainer">
                    <Link to="/" className="logo">
                        <img
                            src="/images/solar-system.svg"
                            alt="Logo"
                            className="logoImg"
                        />
                        <span className="logoText">Solar System</span>
                    </Link>
                </div>
                <nav>
                    <ul className="navList">
                        <li className="navItem">
                            <Link to="/" className="navLink">
                                Home
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/planets" className="navLink">
                                Planets
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/quiz" className="navLink">
                                Quiz
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to={`/profile/#`} className="navLink">
                                @abv.bg
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/logout" className="navLink">
                                Logout
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/sign-up" className="navLink">
                                Sign up
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};