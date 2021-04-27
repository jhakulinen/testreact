//import axios from 'axios';
import React, {useState, useEffect} from 'react';

// const MusicArray = (props) => {
//   const { data } = props;
//   var i = 0;
//   return (
//     <div>
//       <ul>
//         {data.map((item) => (
//           <li key={i++}>
//             {item.artist} ( {item.title} )
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const GetAll = () => {
//   const [musics, setMusics] = useState(null)
//   useEffect(() => {
//     fetch("https://mongo-hakulinen.herokuapp.com/api/getall")
//       .then((results) => {
//         //console.log(results.json());
//         return results.json();
        
//       })
//       .then((data) => {
//         console.log(data)
//         setMusics(data)
//       })
//   }, [])

//   return (
//     <>
//       {
//         musics ?
//           <MusicArray musics={musics}/>
//           : <div>Nothing here. Fetching data...</div>
//       }
//     </>
//   );
// }

const GetData = () => {
  const [quotes, setQuotes] = useState(null)
  useEffect(() => {
   // fetch("https://api.jsonbin.io/b/5e9ef7272940c704e1dc1099%22)
    fetch("https://mongo-hakulinen.herokuapp.com/api/getall")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        //console.log(data.quotes)
        console.log(data)
        //setQuotes(data.quotes)
        setQuotes(data)
      })
  }, [])

  return (
    // Tässä käytetään ns. fragmentteja, eli palautetaan tulosjoukko ilman ympäröivää DIV-elementtiä
    <> 
      {
        quotes ?
          <SitaattiTaulu data={quotes} />
          : <div>Nothing here.Fething data...</div>
      }
    </> // fragmenttien lopetustägi
  );
}


const SitaattiTaulu = (props)=>{
  const {data}=props;
  var i = 0;
  return (
    <div>
      <ul>
        {data.map((item)=>(
        <li key={i++}>
          {item.title} ({item.artist})
        </li>
        ))}
      </ul>
    </div>
  )
};


const App = () => {
  return(
    <>
      <GetData />
    </>
  )
}
export default App;