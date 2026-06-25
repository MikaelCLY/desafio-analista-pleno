import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function EmptyState({ searching }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
        gap: 1,
      }}
    >
      <Typography variant="h5" color="text.secondary">
        {searching ? 'Nenhum resultado para a busca' : 'Nenhum velório em andamento'}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        {searching
          ? 'Verifique o número de registro e tente novamente.'
          : 'Os velórios em andamento aparecerão aqui automaticamente.'}
      </Typography>
    </Box>
  )
}
