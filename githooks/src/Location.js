import React, { useState, useEffect } from 'react';
// useState => serve para substituir o this.state
// useEffect => substitui o componentdidmount, componentdidupdate e componentwillunmount

export default function Location() {
  const [location, setLocation] = useState([])


  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(handlePositionReceive)

    return () => navigator.geolocation.clearWatch(watchId)
  },[])

  function handlePositionReceive({coords}){
    const { latitude , longitude } = coords;

    setLocation({ latitude , longitude});
  }

  return (
    <>
      Latitude: {location.latitude} <br/>
      Longettude: {location.longitude}
    </>
  )
}
