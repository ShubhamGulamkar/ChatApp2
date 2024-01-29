import { Box, Typography,useTheme,useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = () =>{
//console.log("login page")
const theme = useTheme();
const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
    <Box>
        <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textalign="center">
        <Typography
        fontWeight="bold"
        fontSize="32px"
        color="primary"
        >
        Sociopedia
        </Typography> 
        </Box> 

        <Box width={isNonMobileScreens ? "50%" : "93%"} m="2rem auto" backgroundColor={theme.palette.background.alt} p="2rem" borderRadius="1.5rem">
        <Typography
        fontWeight="500"
        varient="h5"
        sx ={{mb : "1.5rem"}}
        >
        Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography> 
        <Form/>
        </Box> 
</Box>)
}
export default LoginPage;