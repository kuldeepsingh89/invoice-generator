import { Typography, Box, CssBaseline, Link } from "@mui/material"
import { FaMoneyBillWave } from "react-icons/fa"

const Footer = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <CssBaseline />

      <Box
        component={"footer"}
        sx={{
          py: 1,
          px: 1,
          mt: "auto",
          bgColor: "#000",
        }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          component={"p"}
          sx={{
            color: "#07f011",
          }}
        >
          <FaMoneyBillWave /> Because Money is as important as oxygen!{" "}
          <FaMoneyBillWave />
        </Typography>
        <Copyright />
      </Box>
    </Box>
  )
}

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "#fff",
      }}
    >
      {"Copyright &copy;"}

      <Link color={"inherit"} href="https://github.com/kuldeepsingh89">
        Invoice Generator
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

export default Footer
