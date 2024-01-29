import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state"; 
import axios from 'axios';

const FriendListWidget = ({userId})=>{
    const dispatch = useDispatch();
    const {palette} = useTheme();
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);


    // const getFriends = async()=>{
    //     const response = await fetch(
    //         `https://chatapp-xa59.onrender.com/users/${userId}/friends`,
    //         {
    //             method:"GET",
    //             headers:{Authorization : `Bearer ${token}`},
    //         }
    //     );
    //     const data = await response.json();
    //     console.log({data})
    //     dispatch(setFriends({friends:data}));
    // };

    const getFriends = async (userId, token, dispatch) => {
      try {
        const response = await axios.get(`https://chatapp-xa59.onrender.com/users/${userId}/friends`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const data = response.data;
        console.log({ data });
        dispatch(setFriends({ friends: data }));
      } catch (error) {
        // Handle any error that occurs during the API request
        console.error('Error fetching friends data:', error);
        // You might want to show an error message to the user or handle it appropriately
      }
    };

    
    useEffect(() => {
        getFriends();
      }, []);

      return (
        <WidgetWrapper p="1rem">
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {Array.isArray(friends) && friends.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </Box>
      ) : (
        <Typography color={palette.neutral.medium}>
          No friends available.
        </Typography>
      )}
      {/* <Box display="flex" flexDirection="column" gap="1.5rem">
      {Array.isArray(friends) &&
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
      </Box> */}
    </WidgetWrapper>

      )
}

export default FriendListWidget;