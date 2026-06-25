import { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useVelorios } from './hooks/useVelorios'
import { SearchBar } from './components/SearchBar'
import { VelorioCard } from './components/VelorioCard'
import { EmptyState } from './components/EmptyState'

export default function App() {
  const { velorios, loading, error } = useVelorios(30000)
  const [termo, setTermo] = useState('')

  const handleSearch = useCallback((val) => setTermo(val), [])

  const filtrados = termo
    ? velorios.filter((v) =>
        v.numero_registro.toLowerCase().includes(termo.toLowerCase())
      )
    : velorios

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 700, mb: 1, letterSpacing: 0.5 }}
        >
          Memorial Luto Curitiba
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Velórios em andamento
        </Typography>

        <Box sx={{ mb: 4 }}>
          <SearchBar onChange={handleSearch} />
        </Box>

        {error && !loading && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Falha ao atualizar a lista. Exibindo os últimos dados disponíveis.
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : filtrados.length === 0 ? (
          <EmptyState searching={!!termo} />
        ) : (
          <Grid container spacing={3}>
            {filtrados.map((v) => (
              <Grid key={v.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <VelorioCard velorio={v} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
