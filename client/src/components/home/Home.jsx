import { useHomeData } from "../../api/homeAPI";
import FactOfTheDay from "./factOfTheDay/FactOfTheDay";
import HeroSection from "./heroSection/HeroSection";
import LastQuiz from "./lastQuiz/LastQuiz";

export default function Home() {
    const { fact, quiz, planet, error, loading } = useHomeData();
    return (
        <>
            <HeroSection />
            <section className="sliderWrapper">
                <div className="planetsTitle">
                    <h2>Journey Through the Solar System</h2>
                </div>
                <section className="something">
                    <FactOfTheDay fact={fact}/>
                    <LastQuiz latestQuiz={quiz}/>
                </section>
            </section>
        </>
    )
}