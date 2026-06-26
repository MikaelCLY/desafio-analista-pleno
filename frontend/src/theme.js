import { createTheme } from '@mui/material/styles'

// Paleta extraída da logo Luto Curitiba (azul #7C9FC0) + neutros frios.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4F7099', light: '#7C9FC0', dark: '#3C5876', contrastText: '#ffffff' },
    background: { default: '#F4F6F8', paper: '#ffffff' },
    text: { primary: '#1E2A37', secondary: '#5A6877' },
    divider: '#E4E9EF',
  },
  shape: { borderRadius: 8 },
  typography: {
    // Corpo em Montserrat; o wordmark "Luto Curitiba" usa EB Garamond (aplicado pontualmente).
    fontFamily: "'Montserrat', system-ui, -apple-system, Segoe UI, sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCssBaseline: {
      styleOverrides: {
        '::placeholder': { color: '#9AA6B2', opacity: 1 },
      },
    },
  },
})

// Estados sóbrios — sem vermelho, inadequado ao contexto.
export const STATUS = {
  nao_iniciado: { label: 'Não iniciado', dot: '#94A3B4', text: '#5A6A79', bg: '#EEF1F4' },
  em_andamento: { label: 'Em andamento', dot: '#5E9079', text: '#3F6B55', bg: '#E7F0EA' },
  concluido:    { label: 'Concluído',    dot: '#A79FB2', text: '#6C6578', bg: '#EFEBF2' },
}
