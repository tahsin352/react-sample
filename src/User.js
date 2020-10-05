import React, { useState, useEffect } from 'react';

/**
 * User
 */
const User = props => {
    const [error, setError] = useState(null);
    const [user] = useState(props);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bio, setBio] = useState([]);
    const [url, setUrl] = useState([]);

    useEffect(() => {
        fetch(`https://api.slstice.com/mock/users/${user.user.username}?api_key=ZSTYF0GBSSF0l3Ou6DTPE`)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result.response.user.profile_images.small);
              setIsLoaded(true);
              setBio(result.response.user);
              setUrl(result.response.user.profile_images.small);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="user">
                {bio.first_name} {bio.last_name} <img src={url} className="user-icon" alt="user-logo" />
            </div>
        );
      }    
    
}

export default User;
