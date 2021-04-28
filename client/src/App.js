import axios from 'axios';
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
//var x = 0;
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


const PostForm = () => {
  const url="https://mongo-hakulinen.herokuapp.com/api/add"
  const [data, setData] = useState({
    artist:"",
    title:""
  })

  const submit = (e) => {
    e.preventDefault();
    axios.post(url, {
      artist: data.artist,
      title: data.title
    })
    .then(res=>{
      console.log(res.data)
    })
  }

  const handle = (e) => {
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }



  return (
    <div>
      <form onSubmit={(e)=> submit(e)}>
        <input onChange={(e)=>handle(e)} id="artist" value={data.artist} placeholder="Artist" type="text"></input>
        <input onChange={(e)=>handle(e)} id="title" value={data.title} placeholder="Song title" type="text"></input>
        <button>Submit</button>
      </form>
    </div>
  )
}


const App = () => {
  return(
    <>
      <PostForm />
      <GetData />
    </>
  )
}
export default App;