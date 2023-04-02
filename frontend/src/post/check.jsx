import React , {useState , useEffect} from 'react'
function Check() {
    
  
      
    // const Comment_data = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:4000/comment/${id}/new`, {
    //         method: "GET",
    //       });
      
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch comments");
    //       }
    //     }
    //  }
      
    //       const json = await response.json();
    //       setComment_data(json);
      
    //       const postIds = Array.from(new Set(json.map((comment) => comment.user)));
      
      
    //       const postsResponse = await Promise.all(
    //         postIds.map((postId) =>
    //           fetch(`http://localhost:4000/user/${postId}/no`, {
    //             method: "GET",
    //             credentials: "include",
    //           })
    //         )
    //       );
    //       if ( postsResponse.every((res) => res.ok)) {
    //         const postData = await Promise.all(postsResponse.map((res) => res.json()));
      
    //         const commentData = json.map((comment, i) => ({
    //           ...comment,
    //           user: postData[i],
    //         }));
      
    //         setComment_data(commentData);
            
    //       } else {
    //         console.log("Failed to fetch user or post data");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       console.log("Failed to fetch comments, user, and post data");
     
      
  return (
  <>
  <h1>hello this is for checking</h1>
  </>
  )
}

export default Check
