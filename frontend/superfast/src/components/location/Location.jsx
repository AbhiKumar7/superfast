import React, { useEffect, useState } from "react";

function Location() {
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [county, setcounty] = useState("");

  useEffect(() => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(userCordinates);
    function userCordinates(position) {
      const cor = position.coords;

      setlatitude(cor.latitude);
      setlongitude(cor.longitude);
    }
  }, []);

  const url = `https://api.opencagedata.com/geocode/v1/json?key=${
    import.meta.env.VITE_GEO_KEY
  }&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;

  const fetchLocation = async () => {
    const locationData = await fetch(url);
    const data = await locationData.json();      
    const citylocation = data?.results[0].components?.city;
    const pinCodelocation = data?.results[0].components?.postcode;
    const countyLocation = data?.results[0].components?.suburb;
    setcounty(countyLocation);
    setpincode(pinCodelocation);
    setcity(citylocation);
  };
  useEffect(() => {
    fetchLocation();
  }, [latitude, longitude]);
  return (
    <div>
      <p>{`${county}, ${city},${pincode}`}</p>
    </div>
  );
}

export default Location;
