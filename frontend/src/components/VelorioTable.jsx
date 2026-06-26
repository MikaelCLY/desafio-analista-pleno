import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { bannerUrl } from '../api/velorios'

const fmtData = (ts) =>
  new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ts))

const STATUS_LABELS = {
  nao_iniciado: { label: 'Não iniciado', color: 'default' },
  em_andamento: { label: 'Em andamento', color: 'success' },
  concluido: { label: 'Concluído', color: 'error' },
}

const COLUNAS = [
  'Status',
  'Nº Registro',
  'Nome',
  'Sala',
  'Início do velório',
  'Início do sepultamento',
  'Local do sepultamento',
  'Funerária',
  'Ações',
]

export function VelorioTable({ velorios, onExport }) {
  const [erro, setErro] = useState(false)

  const handleExportar = async (velorio) => {
    const url = bannerUrl(velorio.id)
    try {
      const res = await fetch(url)
      if (res.status === 404) {
        setErro(true)
        return
      }
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `banner-${velorio.numero_registro}.pdf`
      link.click()
      URL.revokeObjectURL(link.href)
    } catch {
      setErro(true)
    }
  }

  return (
    <>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {COLUNAS.map((col) => (
                <TableCell
                  key={col}
                  sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {velorios.map((v) => {
              const status = STATUS_LABELS[v.status] ?? { label: v.status, color: 'default' }
              return (
                <TableRow
                  key={v.id}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <TableCell>
                    <Chip label={status.label} color={status.color} size="small" />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{v.numero_registro}</TableCell>
                  <TableCell>{v.nome_completo}</TableCell>
                  <TableCell>{v.sala_velorio ?? '—'}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{fmtData(v.inicio_velorio)}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {v.inicio_sepultamento ? fmtData(v.inicio_sepultamento) : '—'}
                  </TableCell>
                  <TableCell>{v.local_sepultamento}</TableCell>
                  <TableCell>{v.funeraria}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleExportar(v)}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Exportar Banner
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={erro}
        autoHideDuration={4000}
        onClose={() => setErro(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setErro(false)}>
          Atendimento não encontrado ou erro ao gerar o banner.
        </Alert>
      </Snackbar>
    </>
  )
}
