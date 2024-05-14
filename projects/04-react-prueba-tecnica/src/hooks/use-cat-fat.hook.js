import {getRandomFact} from "../services/facts.service.js";
import {useEffect, useState} from "react";

export const useCatFat = () => {
    const [fact, setFact] = useState('');
    const [factError, setFactError] = useState('');

    const refreshRandomFact = () => {
        getRandomFact()
            // .then(setFact)
            .then((newFact) => setFact(newFact))
            .catch((e) => setFactError(e.message));
    }

    // Getting fact on page load
    useEffect(refreshRandomFact, []);

    return {fact, factError, refreshRandomFact};
}
