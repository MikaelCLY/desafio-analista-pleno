import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { StatusChip } from './StatusChip'
import { formatDateTimePtBr } from '../utils/dateFormat'

const COLUNAS = [
  'Status',
  'Registro',
  'Nome',
  'Sala',
  'Início velório',
  'Sepultamento',
  'Local',
  'Funerária',
  '',
]

const thSx = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '.07em',
  textTransform: 'uppercase',
  color: '#8B97A4',
  bgcolor: '#F7F9FB',
  borderBottom: '1px solid',
  borderColor: 'divider',
  whiteSpace: 'nowrap',
  py: 1.6,
}

const tdSx = { fontSize: 14, color: 'text.primary', borderColor: '#EEF1F4', py: 1.6 }

export function VelorioTable({ velorios, onExportar }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderColor: 'divider', borderRadius: 2.5 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {COLUNAS.map((col, i) => (
              <TableCell key={i} align={i === COLUNAS.length - 1 ? 'right' : 'left'} sx={thSx}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {velorios.map((v) => (
            <TableRow key={v.id} sx={{ '&:hover': { bgcolor: '#F7F9FB' }, '&:last-child td': { border: 0 } }}>
              <TableCell sx={tdSx}><StatusChip status={v.status} /></TableCell>
              <TableCell sx={{ ...tdSx, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, fontWeight: 500, color: 'primary.main', whiteSpace: 'nowrap' }}>
                {v.numero_registro}
              </TableCell>
              <TableCell sx={{ ...tdSx, fontWeight: 500 }}>{v.nome_completo}</TableCell>
              <TableCell sx={{ ...tdSx, color: 'text.secondary', whiteSpace: 'nowrap' }}>{v.sala_velorio ?? '—'}</TableCell>
              <TableCell sx={{ ...tdSx, fontSize: 13, color: 'text.secondary', whiteSpace: 'nowrap' }}>{formatDateTimePtBr(v.inicio_velorio)}</TableCell>
              <TableCell sx={{ ...tdSx, fontSize: 13, color: 'text.secondary', whiteSpace: 'nowrap' }}>{formatDateTimePtBr(v.inicio_sepultamento)}</TableCell>
              <TableCell sx={{ ...tdSx, fontSize: 13.5, color: 'text.secondary' }}>{v.local_sepultamento}</TableCell>
              <TableCell sx={{ ...tdSx, fontSize: 13.5, color: 'text.secondary' }}>{v.funeraria}</TableCell>
              <TableCell sx={{ ...tdSx }} align="right">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onExportar(v)}
                  sx={{
                    whiteSpace: 'nowrap',
                    fontSize: 12.5,
                    borderColor: '#CFD9E3',
                    color: 'primary.main',
                    '&:hover': { bgcolor: '#EAF0F6', borderColor: 'primary.light' },
                  }}
                >
                  Exportar banner
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
