import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
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

export function VelorioCard({ velorio }) {
  const [erro, setErro] = useState(false)

  const status = STATUS_LABELS[velorio.status] ?? { label: velorio.status, color: 'default' }

  const handleExportar = async () => {
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
      <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {velorio.nome_completo}
            </Typography>
            <Chip
              label={status.label}
              color={status.color}
              size="small"
              sx={{ ml: 1, flexShrink: 0 }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {velorio.numero_registro}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="body2">
              <strong>Sala:</strong> {velorio.sala_velorio ?? '—'}
            </Typography>
            <Typography variant="body2">
              <strong>Início do velório:</strong> {fmtData(velorio.inicio_velorio)}
            </Typography>
            <Typography variant="body2">
              <strong>Início do sepultamento:</strong>{' '}
              {velorio.inicio_sepultamento ? fmtData(velorio.inicio_sepultamento) : '—'}
            </Typography>
            <Typography variant="body2">
              <strong>Local do sepultamento:</strong> {velorio.local_sepultamento}
            </Typography>
            <Typography variant="body2">
              <strong>Funerária:</strong> {velorio.funeraria}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="contained" size="small" onClick={handleExportar} fullWidth>
            Exportar Banner
          </Button>
        </CardActions>
      </Card>

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
