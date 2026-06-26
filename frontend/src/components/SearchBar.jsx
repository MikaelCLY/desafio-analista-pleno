import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA6B2" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export function SearchBar({ onChange }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => onChange(value.trim()), 300)
    return () => clearTimeout(timer)
  }, [value, onChange])

  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Buscar por nome ou registro (ex.: Maria ou REG-2026-0412)"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ ml: 0.5 }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: 'background.paper',
          borderRadius: 2,
          fontSize: 14,
          '& fieldset': { borderColor: '#D6DDE5' },
          '&:hover fieldset': { borderColor: '#C2CCD7' },
          '&.Mui-focused fieldset': { borderColor: 'primary.light', borderWidth: '1px' },
          '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(124,159,192,.16)' },
        },
      }}
    />
  )
}
