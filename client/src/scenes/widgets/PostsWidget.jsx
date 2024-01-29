import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import axios from 'axios';


const PostsWidget =({userId,isProfile = false}) =>{
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.posts);
    const token = useSelector((state)=>state.token);

    // const getPosts =async () =>{
    //     const response = await fetch("https://chatapp-xa59.onrender.com/posts",{
    //         method:"GET",
    //         headers:{Authorization:`Bearer ${token}`},
    //     });
    //     const data = await response.json();
    //     dispatch(setPosts({posts:data}));
    // };

    const getPosts = async (token, dispatch) => {
        try {
          const response = await axios.get("https://chatapp-xa59.onrender.com/posts", {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          const data = response.data;
          dispatch(setPosts({ posts: data }));
        } catch (error) {
          // Handle any error that occurs during the API request
          console.error('Error fetching posts data:', error);
          // You might want to show an error message to the user or handle it appropriately
        }
      };

    // const getUserPosts = async ()=>{
    //     const response=await fetch(
    //         `https://chatapp-xa59.onrender.com/posts/${userId}/posts`,{
    //             method:'GET',
    //             headers:{Authorization: `Bearer ${token}`},
    //         }
    //     );
    //     const data = await response.json();
    //     dispatch(setPosts({posts:data}))
    // };

    const getUserPosts = async (userId, token, dispatch) => {
        try {
          const response = await axios.get(`https://chatapp-xa59.onrender.com/posts/${userId}/posts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          const data = response.data;
          dispatch(setPosts({ posts: data }));
        } catch (error) {
          // Handle any error that occurs during the API request
          console.error('Error fetching user posts data:', error);
          // You might want to show an error message to the user or handle it appropriately
        }
      };

    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    },[]);

    return(
        <>
        {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            />
        )
        )}
        </>
    )

}

export default PostsWidget;