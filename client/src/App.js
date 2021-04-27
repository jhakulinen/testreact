//import axios from 'axios';
import React, {useState, useEffect} from 'react';

const MusicArray = (props) => {
  const { data } = props;

  return (
    <div>
      <ul>
        {data.map((item) =>(
          <li>
            {item.artist} ( {item.title} )
          </li>
        ))}
      </ul>
    </div>
  );
};

const GetAll = () => {
  const [musics, setMusics] = useState([])
  useEffect(() => {
    fetch("https://mongo-hakulinen.herokuapp.com/api/getall")
      .then((results) => {
        //console.log(results.json());
        return results.json();
        
      })
      .then(data => {
        console.log(data.musics)
        setMusics(data.musics)
      })
  }, [])

  return (
    <>
      {
        musics ?
          <MusicArray musics={musics}/>
          : <div>Nothing here. Fetching data...</div>
      }
    </>
  );
}


const App = () => {
  return(
    <>
      <GetAll />
    </>
  )
}
export default App;