import React, { useEffect, useState } from 'react';
import { Cards, Chart, CountryPicker } from './components/index'
import styles from './App.module.css'
import { fetchData } from './api'
import coronaImage from './assets/images/image.png'

function App() {
  const [data, setData] = useState({});
  // const [country, setCountry] = useState("");

  const getData = async () => {
    const modifiedData = await fetchData();
    setData(modifiedData);
  }

  const handleCountryChange = async (country) => {
    //fetch data and then set state
    const modifiedData = await fetchData(country);
    setData(modifiedData);
    // setCountry(country);
  }

  useEffect(()=> {
    getData();
  },[]);
  return (
    // with modules this is how we pass in css. 
    //This makes sure there is no interference
    <div className={styles.container}>
      <img src={coronaImage} alt="COVID-19" className={styles.image}/> 
      <Cards {...data}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={data} /> 
      {/* country={country} */}
    </div>
  );
}

export default App;

/*
"axios": "^0.24.0", --> fetch from API

    "classnames": "^2.3.1", --> he classNames function takes any number of arguments
     which can be a string or object. The argument 'foo' is short for { foo: true }. 
     If the value associated with a given key is falsy, that key won't be included in the output.

    "react-chartjs-2": "^4.0.0", --> charts

    "react-countup": "^6.1.0", --> count up effect
*/