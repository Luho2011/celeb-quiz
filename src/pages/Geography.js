import React from 'react'
import "./Geography.css"
import {useState} from "react";
import country from "../Countries.json"

function Geography() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [population, setPopulation] = useState();
  const [continent, setContinent] = useState();
  const [president, setPresident] = useState();
  const [currency, setCurrency] = useState();
  const [language, setLanguage] = useState();
  const [flag, setFlag] = useState();
  const [hintIndex, setHintIndex] = useState(0);
  const [countryList, setCountryList] = useState(country);

  //alle Infos über das Land hier speichern (area, image, präsident, einwohnerzahl etc)
  const handleStart = () => {
      let random = Math.floor(Math.random() * country.length);
      setImage(countryList[random].image);
      setArea(countryList[random].area);
      setPopulation(countryList[random].population);
      setContinent(countryList[random].continent);
      setPresident(countryList[random].president);
      setCurrency(countryList[random].currency);
      setLanguage(countryList[random].language);
      setFlag(countryList[random].flag);
      setHintIndex(0);
  }

  const handleNextHint = () => {
    setHintIndex(prevIndex => prevIndex +1);
  }


  return (
    <div className='geo'>
      <h1>Guess the Country</h1>
        <div className='button'>
            <button className='button__start' onClick={handleStart}>Next</button>
            <button className='button__start' onClick={handleNextHint}>Next Hint</button>
        </div>
        <div className='pic_geo'>
        <img src={image} />
        <div className='info'>
        {hintIndex >= 1 && <h1>{`area: ${area}`}</h1>}
        {hintIndex >= 2 && <h1>{`population: ${population}`}</h1>}
        {hintIndex >= 3 && <h1>{`continent: ${continent}`}</h1>}
        {hintIndex >= 4 && <h1>{`president: ${president}`}</h1>}
        {hintIndex >= 5 && <h1>{`currency: ${currency}`}</h1>}
        {hintIndex >= 6 && <h1>{`language(s): ${language}`}</h1>}
        {hintIndex >= 7 && <img className='flag' src={flag} />}
        </div> 
      </div>
    </div>
  )
}

export default Geography