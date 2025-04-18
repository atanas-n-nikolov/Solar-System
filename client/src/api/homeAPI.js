import { useEffect, useState } from "react";
import request from "./request";

const baseUrl = 'http://localhost:3000/';

export const useHomeData = () => {
    const [fact, setFact] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [planet, setPlanet] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get(baseUrl);
                if (response) {
                    setFact(response.fact);
                    setQuiz(response.latestQuiz);
                    setPlanet(response.planets);
                } else {
                    setError('No data.');
                };
                setLoading(false);
            } catch (error) {
                setError('Failed to load fact. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { fact, quiz, planet, error, loading };
};