import React, { useState, useEffect } from 'react';
import Media from './Media';
import User from './User';
import like from './like.jpg';
import './App.css';

/**
 * Main App
 */
const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://api.slstice.com/mock/posts?api_key=ZSTYF0GBSSF0l3Ou6DTPE&limit=2&offset=${counter}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.response.posts);
          setIsLoaded(true);
          setCounter(counter => counter + 1);
          setItems(result.response.posts);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, 6000);
    return () => clearInterval(interval);
    
  }, [counter])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li className="row" key={item.id}>
            <Media {...item} />
            <div className="column">
              <User {...item} />
              <h3>{item.title}</h3> 
              <p>{item.description}</p> 
              <p><img src={like} className="like-icon" />{item.likes}</p>
              <p>{item.created}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
