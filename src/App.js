import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import axios from "axios";
import Star from "@mui/icons-material/Star";
import { format } from "timeago.js";

import "./app.css";
import mapboxgl from "mapbox-gl";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Instructions } from "./components/Instructions";

import logo from './assets/socialTag.png'



function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [showPopup, setShowPopup] = React.useState(true);
  const [showPop, setShowPop] = useState(false)

  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)

  

  const [viewport, setViewport] = useState({
   
    longitude: 9,
    latitude: 53
  })

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("https://socialtags-map.herokuapp.com/pins");
        setPins(res.data);

      } catch (err) {
        console.log(err);
      }
    };
  getPins();

  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setShowPopup(!showPopup)
    setCurrentPlaceId(id)
    setViewport({ longitude: long, latitude: lat})
 
  };

  const handleAddClick = (e) => {
    const {lng , lat} = e.lngLat
    setNewPlace({
      lng,
      lat
    })
    console.log(newPlace)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    }

    try {
      const res = await axios.post(`/pins`, newPin)
      setPins([...pins, res.data])
      setNewPlace(null)


    }catch(err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null)
  }

  const handleRegister = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowInstructions(false)
  }

  const handleLogin = () => {
    setShowRegister(false)
    setShowLogin(true)
    setShowInstructions(false)
  }

  const handleInstructions = () => {
    setShowRegister(false)
    setShowLogin(false)
    setShowInstructions(true)
  }
  return (
    <div className="App small">
      <Map
        initialViewState={{
          longitude: viewport.longitude,
          latitude: viewport.latitude,
          zoom: 4,
        }}
      
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/makariuz/cl6i3pl01000714mpoiydz8uw"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
        transitionDuration="1000"
        doubleClickZoom={!currentUser}
      >
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="left"  >
              <RoomIcon
                style={{
                  fontSize: viewport.zoom * 1000,
                  color: p.username===currentUser ? "crimson": "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}

              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date"> {format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && currentUser && (
        <Popup
                longitude={newPlace.lng}
                latitude={newPlace.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setNewPlace(null)}

              ><div>
                <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)}/>
                  <label>Review</label>
                <textarea placeholder="Say something about this place."  onChange={(e) => setDesc(e.target.value)}/>
                  <label>Rating</label>
                <select  onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
               
                </select>
                  <button className="submitButton" type="submit">Submit</button>
                </form>
              </div></Popup>
              )
              }
              
              {currentUser ? ( 
                <button className="buttons">
                <button className="button instructions">Instructions</button>
                <button className="button logout" onClick={handleLogout}>Log out</button>
                </button>
                
                ) : (
        <div className="buttons">
        <button className="button instructions" onClick={handleInstructions}>Instructions</button>
              <button className="button login" onClick={handleLogin}>Login</button>
              <button className="button register" onClick={handleRegister}>Register</button>
              </div>
      )}
      {showInstructions && <Instructions setShowInstructions={setShowInstructions} />}
      {showRegister &&     <Register setShowRegister={setShowRegister}/>}
      {showLogin &&     <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>} 
            <div className="logoMain">
            <img src={logo} alt="Social Tag Logo"  className='loginLogo'/>
            </div>
      </Map>
      
     
   
    </div>
  );
}

export default App;
