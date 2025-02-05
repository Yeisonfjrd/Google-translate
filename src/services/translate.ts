import { SUPPORTED_LANGUAGES } from '../constants';
import { type FromLanguage, type Language } from '../types';

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}): Promise<string> {
  if (fromLanguage === toLanguage) return text;

  let fromCode = fromLanguage;
  if (fromLanguage === 'auto') {
    console.warn('La detección automática de idioma no está habilitada. Usando inglés como idioma predeterminado.');
    fromCode = 'en';
  }

  const toCode = SUPPORTED_LANGUAGES[toLanguage];
  const fromCodeMapped = SUPPORTED_LANGUAGES[fromCode as keyof typeof SUPPORTED_LANGUAGES];

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromCodeMapped}|${toCode}`
    );
    const data = await response.json();

    return data.responseData.translatedText;

  } catch (error) {
    console.error('Error en la traducción:', error);
    return text;
  }
}