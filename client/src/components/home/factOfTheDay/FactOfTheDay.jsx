export default function FactOfTheDay() {
    return (
        <article className="fact">
            <div className="randomDay">
                <div className="factHeader">
                    <h2>
                        DID YOU KNOW<br />
                        ON THIS DAY ...
                    </h2>
                </div>
                <div className="factContent">
                    <h3><span className="factsDescSmall">IN:</span><span className="factsDescLarge">0</span></h3>
                    <p className="title">
                        <span className="factsDescSmall">THE:</span><span className="factsDescLarge">0</span>
                    </p>
                    <p className="description">
                        <span className="factsDescSmall">DESC:</span><span className="factsDescLarge">0</span>
                    </p>
                </div>
            </div>
        </article>
    )
}