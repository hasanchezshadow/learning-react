import {Question} from "../types/types";

export const getAllQuestions = async (limit: number): Promise<Question[]> => {
    const res = await fetch(`http://localhost:5173/data.json?limit=${limit}`);
    return res.json();
}
