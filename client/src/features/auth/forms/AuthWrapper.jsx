import {Box} from "@mui/material";

const AuthWrapper = ({children}) => {
    return (
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {children}
        </Box>
    )
}

export default AuthWrapper;