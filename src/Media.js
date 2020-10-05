import React, { useState, useEffect } from 'react';

/**
 * Media
 */
const Media = props => {
    const [error, setError] = useState(null);
    const [media] = useState(props);
    const [isLoaded, setIsLoaded] = useState(false);
    const [url, setUrl] = useState([]);

    useEffect(() => {
        fetch(`https://api.slstice.com/mock/medias/${media.mediaId}?api_key=ZSTYF0GBSSF0l3Ou6DTPE`)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result.response.media.urls.full);
              setIsLoaded(true);
              setUrl(result.response.media.urls.full);
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
            <div className="column media">
                <img src={url} className="App-logo" alt="logo" />
            </div>
        );
      }    
    
}

export default Media;
