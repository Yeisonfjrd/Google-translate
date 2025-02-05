import { useReducer } from 'react'
import { type State, type Action, FromLanguage, type Language } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

function reducer(state: typeof initialState, action: Action) {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) {
      return state;
    }
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: '',
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  if (type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(reducer, initialState);

  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  const setFromLanguages = (payload: FromLanguage) => dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  const setToLanguage = (payload: Language) => dispatch({ type: 'SET_TO_LANGUAGE', payload });
  const setFromText = (payload: string) => dispatch({ type: 'SET_FROM_TEXT', payload });
  const setResult = (payload: string) => dispatch({ type: 'SET_RESULT', payload });

  const setLoading = (payload: boolean) => dispatch({ type: 'SET_LOADING', payload }); // New function

  return {
    loading,
    setLoading,
    fromLanguage,
    setFromLanguages,
    toLanguage,
    setToLanguage,
    fromText,
    setFromText,

    result,
    setResult,
    interchangeLanguages,
  };
}