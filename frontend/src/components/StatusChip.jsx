import Box from '@mui/material/Box'
import { STATUS } from '../theme'

const FALLBACK = { label: '—', dot: '#94A3B4', text: '#5A6A79', bg: '#EEF1F4' }

export function StatusChip({ status }) {
  const s = STATUS[status] ?? { ...FALLBACK, label: status }
  return (
    <Box
      component="span"
      sx={{
        pl: '9px',
        pr: '11px',
        py: '4px',
        borderRadius: '20px',
        bgcolor: s.bg,
        color: s.text,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: s.dot }} />
      {s.label}
    </Box>
  )
}
