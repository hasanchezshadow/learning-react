import {APIS} from "../constants/apis.constant.js";

export const getRandomFact = async () => {
    const response = await fetch(APIS.FACT);
    if (!response.ok) {
        throw new Error('Error fetching cat');
    }
    const data = await response.json();
    const {fact} = data;
    return fact;
}

export const getCatImageFromText = async (text) => {
    const response = await fetch(`${APIS.CATAAS}`.replace('{text}', text));
    if (!response.ok) {
        throw new Error('Error fetching cat');
    }
    const data = await response.json();
    const {url} = data;
    return url;
}
