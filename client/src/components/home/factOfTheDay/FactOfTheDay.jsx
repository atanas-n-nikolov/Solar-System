export default function FactOfTheDay({ fact }) {
    if (!fact) {
        return null;
    };
    return (
        <article className="fact">
            <div className="sectionWrapper" style={{ alignItems: "center", gap: "2em", padding: "10em 0"}}>
                <div className="factHeader">
                    <h2>
                        DID YOU KNOW<br />
                        ON THIS DAY ...
                    </h2>
                </div>
                <div className="factContent">
                    <h3><span className="factsDescSmall">IN:</span><span className="factsDescLarge">{fact.year}</span></h3>
                    <p className="title">
                        <span className="factsDescSmall">THE:</span><span className="factsDescLarge">{fact.title}</span>
                    </p>
                    <p className="description">
                        <span className="factsDescSmall">DESC:</span><span className="factsDescLarge">{fact.description}</span>
                    </p>
                </div>
            </div>
        </article>
    )
}