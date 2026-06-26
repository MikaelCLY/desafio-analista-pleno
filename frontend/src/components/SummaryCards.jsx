import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ITEMS = [
  { key: 'em_andamento', label: 'Em andamento' },
  { key: 'nao_iniciado', label: 'Não iniciado' },
  { key: 'concluido', label: 'Concluído' },
]

// Cards de resumo por status — clicar filtra a tabela (o card ativo recebe o anel azul).
export function SummaryCards({ counts, value, onChange }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.75, mb: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
      {ITEMS.map((it) => {
        const active = Array.isArray(value) ? value.includes(it.key) : value === it.key
        return (
          <Box
            key={it.key}
            role="button"
            tabIndex={0}
            onClick={() => onChange(it.key)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onChange(it.key)}
            sx={{
              position: 'relative',
              flex: { xs: '1 1 calc(50% - 8px)', sm: 1 },
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              px: 2.5,
              py: 2,
              cursor: 'pointer',
              transition: 'border-color .15s',
              '&:hover': { borderColor: '#C9D4DF' },
              '&:focus-visible': { outline: 'none', borderColor: 'primary.light' },
            }}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8B97A4' }}>
              {it.label}
            </Typography>
            <Typography sx={{ fontSize: 31, fontWeight: 600, color: 'text.primary', mt: 0.75, lineHeight: 1 }}>
              {counts[it.key] ?? 0}
            </Typography>
            {active && (
              <Box sx={{ position: 'absolute', inset: 0, border: '1.5px solid', borderColor: 'primary.light', borderRadius: 2, pointerEvents: 'none' }} />
            )}
          </Box>
        )
      })}
    </Box>
  )
}
