import { Link } from "react-router";

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="backgroundImage"></div>
            <div className="container">
                <div className="content">
                    <h2>Explore the Solar System</h2>
                    <p>Learn everything about planets, stars, and space exploration!</p>
                    <Link to="/planets" className="actionBtn">Start Now</Link>
                </div>
            </div>
        </section>
    )
}