import { AppBar, IconButton, Toolbar, styled } from '@mui/material'
import { GiTomato } from 'react-icons/gi'

const AppToolBar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'center',
  background: 'linear-gradient(to bottom right, #A6A6A6, #CCCCCC);'
  // background: 'linear-gradient(to bottom right, #434343, #6E6E6E)' dark theme
}))

export default function TopBar() {
  return (
    <AppBar position="static">
      <AppToolBar>
        <IconButton size="large">
          <GiTomato color="#D75413" />
        </IconButton>
      </AppToolBar>
    </AppBar>
  )
}
