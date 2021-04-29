import axios from 'axios';
import React, {useState, useEffect} from 'react';

//Tehdään AJAX-pyyntö, jolla haetaan kaikki data APIsta.
const GetData = () => {
  const [music, setMusic] = useState(null)
  useEffect(() => {
    fetch("https://mongo-hakulinen.herokuapp.com/api/getall")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data)
        setMusic(data)
      })
  }, [])

  return (
    // Tässä käytetään ns. fragmentteja, eli palautetaan tulosjoukko ilman ympäröivää DIV-elementtiä
    <> 
      {
        music ?
          <MusicArray data={music} />
          : <div>Nothing here.Fething data...</div>
      }
    </> // fragmenttien lopetustägi
  );
}


const MusicArray = (props)=>{
  const {data}=props;
  var i = 0;

  //Lisätään APIsta saatu data listaan.
  return (
    <div>
      <ul className="list-group">
        {data.map((item)=>(
        <li key={i++} className="list-group-item list-group-item-secondary" style={{textAlign: 'center'}}>
          {item.title} ({item.artist})
        </li>
        ))}
      </ul>
    </div>
  )
};

//Tehdään AJAX-pyyntö, jolla lisätään APIin dataa tekstilomakkeesta.
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

//Lomake, johon on lisätty onSubmit-toiminto, joka ajaa AJAX POSTin.
  return (
    <div>
      <form onSubmit={(e)=> submit(e)}>
        <div className="form-group">
          <label htmlFor="artist">Artist</label>
          <input onChange={(e)=>handle(e)} className="form-control" id="artist" value={data.artist} placeholder="Enter artist" type="text"></input>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input onChange={(e)=>handle(e)} className="form-control" id="title" value={data.title} placeholder="Enter song title" type="text"></input>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
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