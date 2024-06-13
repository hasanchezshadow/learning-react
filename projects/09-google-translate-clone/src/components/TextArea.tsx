import {Form} from "react-bootstrap";
import {SectionType} from "../types/types.d";
import React from "react";

interface Props {
    isLoading?: boolean
    onChange: (value: string) => void
    value: string,
    type: SectionType
}

const commonStyles = { border: 0, height: '200px', resize: 'none' };

const getPlaceholder = ({type, isLoading}: {type: SectionType, isLoading: boolean}): string => {
    if (type === SectionType.From) return 'Enter tex';
    if (isLoading) return 'Translating...';
    return 'Translation';
}

export function TextArea({isLoading, type, value, onChange}: Props) {
    const styles = type === SectionType.From ?
        commonStyles :  {...commonStyles, backgroundColor: '#f5f5f5'};

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    }

    return (
        <Form.Control
            as={'textarea'}
            disabled={type === SectionType.To}
            placeholder={getPlaceholder({type, isLoading: isLoading || false})}
            autoFocus={type === SectionType.From}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}
