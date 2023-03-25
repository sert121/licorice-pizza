
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/theme-glass'


const palette = {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: '#1f2937',
    yellow: '#fbbf24',
    red: '#d00b00',
    green: '#10b981',
    indigo: '#6d5ace',
    blue: '#1e3a8a',
  }
  
export const theme = extendTheme(

    
    {
      initialColorMode: "dark",
      useSystemColorMode: false,
    }
    
    )