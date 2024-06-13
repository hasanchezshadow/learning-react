import {Form} from 'react-bootstrap';
import {AUTO_LANGUAGE, SUPPORTED_LANGUAGES} from '../constants/constants.ts';
import {SectionType, type FromLanguage, type Language} from '../types/types.d';

type Props =
    | {type: SectionType.From, value: FromLanguage, onChange: (payload: FromLanguage) => void}
    | {type: SectionType.To, value: Language, onChange: (payload: Language) => void}

export function LanguageSelector({onChange, type, value}: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value as Language);
    }
    return (
        <Form.Select aria-label={'Select the language'} onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect language</option>}

            {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => {
                return (
                    <option key={key} value={key}>
                        {value}
                    </option>
                );
            })}
        </Form.Select>
    );
}
