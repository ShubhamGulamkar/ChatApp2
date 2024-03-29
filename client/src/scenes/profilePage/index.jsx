import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import axios from 'axios';

const ProfilePage = () =>{

    const[user,setUser] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state)=>state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    // const getUser = async ()=>{
    //     const response = await fetch(`https://chatapp-xa59.onrender.com/users/${userId}`,{
    //         method:"GET",
    //         headers:{Authorization: `Bearer ${token}`},
    //     })
    //     const data = await response.json();
    //     setUser(data);
    // }

    const getUser = async (userId, token, setUser) => {
        try {
          const response = await axios.get(`https://chatapp-xa59.onrender.com/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          const data = response.data;
          setUser(data);
        } catch (error) {
          // Handle any error that occurs during the API request
          console.error('Error fetching user data:', error);
          // You might want to show an error message to the user or handle it appropriately
        }
      };

    useEffect (()=>{
        getUser();
    },[])

    if(!user) return null;

    return (
        <Box>
            <Navbar/>
            <Box 
        width= "100%"
        padding="2rem 6%"        
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center">
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}> 
            <UserWidget userId={userId} picturePath={user.picturePath}/>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}>
                <MyPostWidget picturePath={user.picturePath} />
                <Box m="2rem 0"/>
                <PostsWidget userId={userId}/>
            </Box>
        </Box>
        </Box>
    )
}
export default ProfilePage;