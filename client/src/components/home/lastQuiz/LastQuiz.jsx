import { Link } from "react-router"

export default function LastQuiz() {
    return (
        <div className="wrapperQ">
            <div className="homeContainer">
                <div className="homeLeft">
                    <h1>Welcome, Space Traveler!</h1>
                    <p>
                        Ready to test your knowledge across the cosmos? Embark on a thrilling journey through quizzes of all levels, from the basics of space exploration to the mysteries of distant galaxies. Challenge yourself with different missions and see how far you can go! Answer questions, earn points, and rise through the ranks as you prove your knowledge. Whether you're a Cadet or an experienced Explorer, there's always a new mission to conquer and a higher rank to achieve. Track your progress, compete with others, and see who leads the cosmic leaderboard! Choose your mission, get ready, and launch it! 🚀
                    </p>
                    <Link to="/quiz" className="homeStartButton">Start Your Quiz Quest</Link>
                </div>

                <div className="homeRight">
                    <h2>Last Added Quiz</h2>
                    <div className="lastQuizCard">
                        <h3>Title</h3>
                        <p>Mission Level: Category</p>
                    </div>
                    <Link to={`/quiz/#`} className="homeStartButton">Start Mission</Link>
                </div>
            </div>
        </div>
    )
}