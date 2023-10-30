import { Divider, styled } from "@mui/material"

const DividerStyle = styled(Divider)({
  width: "50%",
  margin: "10px auto 15px auto",
  height: "3px",
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0), rgba(9, 84, 132), rgba(0,0,0,0))",
})

const StyledDivider = () => {
  return <DividerStyle />
}
export default StyledDivider
