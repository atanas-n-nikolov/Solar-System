import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="wrapper">
            <div className="innerSection" style={{ justifyContent: "center" }}>
                <div className="footerContent">
                    <section className="footerSocials" aria-label="Social media">
                        <nav className="mainNavigation" aria-label="Main navigation">
                            <ul className="navList">
                                <li className="navItem">
                                    <a
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="navLink"
                                    >
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li className="navItem">
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Twitter"
                                        className="navLink"
                                    >
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li className="navItem">
                                    <a
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="navLink"
                                    >
                                        <FaInstagram />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </section>
                    <nav className="footerNav" aria-label="Footer navigation">
                        <ul className="navList">
                            <li className="navItem"><Link to="/about" className="navLink">About Us</Link></li>
                            <li className="navItem"><Link to="/contact" className="navLink">Contact</Link></li>
                            <li className="navItem"><Link to="#" className="navLink">Privacy Policy</Link></li>
                            <li className="navItem"><Link to="#" className="navLink">Terms of Service</Link></li>
                        </ul>
                    </nav>
                    <p className="footerText">© 2025 Solar System – All Rights Reserved</p>
                </div>
            </div>

        </footer>

    )
}
