import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const ROTULOS = {
  funeraria: 'Funerária',
  sala_velorio: 'Sala',
  local_sepultamento: 'Local de sepultamento',
}

// Painel de filtros embutido (inline), abre/fecha em Collapse logo abaixo dos controles.
export function FilterPanel({ aberto, opcoes, filtros, onChange, onLimpar, rangeInvalido, qtdFiltros }) {
  return (
    <Collapse in={aberto} unmountOnExit>
      <Paper
        variant="outlined"
        sx={{ mt: 1.5, p: 2.5, borderColor: 'divider', borderRadius: 2.5, bgcolor: 'background.paper' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
          {['funeraria', 'sala_velorio', 'local_sepultamento'].map((campo) => (
            <FormControl key={campo} size="small" sx={{ flex: campo === 'local_sepultamento' ? 1.4 : 1, minWidth: 180 }}>
              <InputLabel id={`label-${campo}`}>{ROTULOS[campo]}</InputLabel>
              <Select
                labelId={`label-${campo}`}
                value={filtros[campo]}
                label={ROTULOS[campo]}
                onChange={(e) => onChange(campo, e.target.value)}
              >
                <MenuItem value=""><em>Todas</em></MenuItem>
                {opcoes[campo].map((op) => (
                  <MenuItem key={op} value={op}>{op}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end', mt: 2 }}>
          <TextField
            type="datetime-local"
            label="Início — de"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filtros.inicio_de}
            error={rangeInvalido}
            helperText=" "
            onChange={(e) => onChange('inicio_de', e.target.value)}
          />
          <TextField
            type="datetime-local"
            label="Início — até"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filtros.inicio_ate}
            error={rangeInvalido}
            helperText={rangeInvalido ? 'A data inicial deve ser anterior à final.' : ' '}
            onChange={(e) => onChange('inicio_ate', e.target.value)}
          />
          <Box sx={{ flex: 1 }} />
          <Button onClick={onLimpar} disabled={!qtdFiltros} sx={{ color: '#7C8896', '&:hover': { bgcolor: '#F1F4F7', color: 'primary.main' } }}>
            Limpar filtros
          </Button>
        </Box>
      </Paper>
    </Collapse>
  )
}
