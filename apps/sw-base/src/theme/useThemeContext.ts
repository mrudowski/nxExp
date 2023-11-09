import {useContext} from 'react';

import {ThemeContext} from '@/theme/ThemeContext.ts';

export const useThemeContext = () => useContext(ThemeContext);
