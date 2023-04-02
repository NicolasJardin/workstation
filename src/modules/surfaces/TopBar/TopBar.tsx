import { AppBar, IconButton, Toolbar } from '@mui/material'
import { GiTomato } from 'react-icons/gi'

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <IconButton size="large">
          <GiTomato color="#FF5349" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
