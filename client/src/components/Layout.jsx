import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box component={"main"} sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
export default Layout
