import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void, className?: string }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void, className?: string }

export const LanguageSelector = ({ onChange, type, value, className }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label='Selecciona el idioma'
      onChange={handleChange}
      value={value}
      className={className}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}