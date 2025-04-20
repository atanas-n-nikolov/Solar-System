import Slider from "react-slick";
import { NextArrow, PrevArrow } from './Arrow';
import { Link } from "react-router";

export default function PlanetSlider({ planets }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (!planets?.length) {
        return null;
    };

    return (
        <div className="planetsContainer">
            <Slider className="catalog-slider" {...settings}>
                {planets.map((planet) => (
                    <div className="p-2">
                        <div className="cardContainer">
                            <img
                                src={planet.image}
                                alt={planet.name}
                                className="cardImage"
                            />
                            <div className="cardContent">
                                <h2 className="cardTitle">{planet.name}</h2>
                                <p className="cardType">Type: {planet.type}</p>
                                <Link to={`/planet/${planet._id}`} className="actionBtn">Learn More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
