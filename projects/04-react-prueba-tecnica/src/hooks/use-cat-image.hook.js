import {useEffect, useState} from "react";
import {getCatImageFromText} from "../services/facts.service.js";
import {APIS} from "../constants/apis.constant.js";
export const useCatImage = ({fact}) => {
    const [catImageUrl, setCatImageUrl] = useState('');
    const [catImageError, setCatImageError] = useState('');

    const text = fact.split(' ', 3).join(' ');

    useEffect(() => {
        if (!fact) return;

        getCatImageFromText(text)
            .then((url) => setCatImageUrl(url))
            .catch((e) => setCatImageError(e.message));

    }, [fact]);

    return {catImageUrl: `${APIS.CATAAS_BASE_URL}${catImageUrl}`, text, catImageError};
}
