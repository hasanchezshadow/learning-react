import {useEffect, useRef, useState} from "react";

export function useSearchParam() {
    const [searchParam, setSearchParam] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);


    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = searchParam === '';
            return;
        }

        if (!searchParam) {
            setError('You must enter a movie name.');
            return;
        }
        if (searchParam.match(/^\d+$/)) {
            setError('You must enter a valid movie name.');
            return;
        }
        if (searchParam.length < 3) {
            setError('You must enter at least 3 characters.');
            return;
        }

        setError(null)
    }, [searchParam]);

    return {searchParam, setSearchParam, error, isFirstInput: isFirstInput.current};
}
