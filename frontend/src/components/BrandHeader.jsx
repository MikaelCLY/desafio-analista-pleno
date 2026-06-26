import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import mark from '../assets/luto-mark.png'

const hoje = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date())

export function BrandHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2.5, md: 5 },
        py: 3,
        bgcolor: 'background.paper',
        borderBottom: '1px solid #E8ECF1',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box component="img" src={mark} alt="Luto Curitiba" sx={{ height: 46, width: 46, objectFit: 'contain' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1px', borderLeft: '1px solid', borderColor: 'divider', pl: 2 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#9AA6B2' }}>
            Memorial
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 23, fontWeight: 600, color: '#26323F', letterSpacing: '.2px' }}>
            Luto Curitiba
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#4A5765', textTransform: 'capitalize', display: { xs: 'none', sm: 'block' } }}>
        {hoje}
      </Typography>
    </Box>
  )
}
