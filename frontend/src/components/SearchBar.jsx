import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

export function SearchBar({ onChange }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => onChange(value.trim()), 300)
    return () => clearTimeout(timer)
  }, [value, onChange])

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar por número de registro (ex: REG-2026-0001)"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
    />
  )
}
