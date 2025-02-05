import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
  className?: string
  readOnly?: boolean
}

const commonStyles = { 
  border: '1px solid #444444',
  height: '200px', 
  borderRadius: '8px',
  padding: '1rem',
  backgroundColor: '#2b2b2b',
  color: '#f4a261',
  fontSize: '1rem',
  lineHeight: '1.5',
  resize: 'none' as const,
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange, className, readOnly = false }: Props) => {
  const styles = type === SectionType.From
    ? { ...commonStyles }
    : { ...commonStyles, backgroundColor: '#333333' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      disabled={type === SectionType.To || loading}
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
      className={`${className} custom-textarea`}
      readOnly={readOnly}
    />
  )
}