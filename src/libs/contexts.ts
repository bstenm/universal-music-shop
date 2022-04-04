import { createContext } from 'react';

import { defaultLang } from 'config';

export type LangContextType = [string, (value: string) => void];

export const LangContext = createContext<LangContextType>([defaultLang, () => null]);
