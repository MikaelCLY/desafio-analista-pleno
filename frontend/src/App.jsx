import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { useVelorios } from './hooks/useVelorios'
import { useVeloriosDashboard } from './hooks/useVeloriosDashboard'
import { useBannerDownload } from './hooks/useBannerDownload'
import { BrandHeader } from './components/BrandHeader'
import { SummaryCards } from './components/SummaryCards'
import { SearchBar } from './components/SearchBar'
import { FilterPanel } from './components/FilterPanel'
import { VelorioTable } from './components/VelorioTable'
import { EmptyState } from './components/EmptyState'

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="10" y1="17" x2="14" y2="17" />
  </svg>
)

export default function App() {
  const { velorios, loading, error } = useVelorios(30000)
  const dashboard = useVeloriosDashboard(velorios)
  const bannerDownload = useBannerDownload()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <BrandHeader />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        <Typography component="h1" sx={{ fontSize: { xs: 26, md: 33 }, fontWeight: 600, color: 'text.primary', letterSpacing: '-.2px', mb: 0.5 }}>
          Velórios
        </Typography>

        <SummaryCards counts={dashboard.counts} value={dashboard.statusFiltro} onChange={dashboard.setStatusFiltro} />

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar key={dashboard.searchKey} onChange={dashboard.handleSearch} />
          </Box>
          <Badge badgeContent={dashboard.qtdFiltros} color="primary" overlap="rectangular">
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => dashboard.setFiltrosAbertos((aberto) => !aberto)}
              sx={{
                whiteSpace: 'nowrap',
                py: 1.1,
                px: 2.25,
                borderColor: '#D6DDE5',
                color: '#475565',
                '&:hover': { borderColor: 'primary.light', color: 'primary.main' },
              }}
            >
              Filtros
            </Button>
          </Badge>
        </Box>

        <FilterPanel
          aberto={dashboard.filtrosAbertos}
          opcoes={dashboard.opcoes}
          filtros={dashboard.filtros}
          onChange={dashboard.mudarFiltro}
          onLimpar={dashboard.limparTudo}
          rangeInvalido={dashboard.rangeInvalido}
          qtdFiltros={dashboard.qtdFiltros}
        />

        {error && !loading && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            Falha ao atualizar a lista. Exibindo os últimos dados disponíveis.
          </Alert>
        )}

        <Box sx={{ mt: 2.75 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress sx={{ color: 'primary.light' }} />
            </Box>
          ) : dashboard.visiveis.length === 0 ? (
            <EmptyState searching={dashboard.filtrando} />
          ) : (
            <VelorioTable velorios={dashboard.visiveis} onExportar={bannerDownload.exportarBanner} />
          )}
        </Box>
      </Container>

      <Snackbar
        open={bannerDownload.erro}
        autoHideDuration={4000}
        onClose={bannerDownload.limparErro}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={bannerDownload.limparErro}>
          Atendimento não encontrado ou erro ao gerar o banner.
        </Alert>
      </Snackbar>
    </Box>
  )
}
