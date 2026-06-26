import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import mark from '../assets/luto-mark.png'

export function EmptyState({ searching }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2.5,
        py: 8,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box component="img" src={mark} alt="" sx={{ height: 64, width: 64, opacity: 0.22, mb: 2.25 }} />
      <Typography sx={{ fontSize: 21, fontWeight: 500, color: '#3E4B59' }}>
        {searching ? 'Nenhum resultado encontrado' : 'Nenhum velório encontrado'}
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#8B97A4', mt: 0.75, maxWidth: 340 }}>
        {searching
          ? 'Ajuste a busca ou os filtros e tente novamente.'
          : 'Os atendimentos aparecerão aqui automaticamente assim que forem registrados.'}
      </Typography>
    </Box>
  )
}
