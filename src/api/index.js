import axios from 'axios'; //use to make API requests

const url = 'https://covid19.mathdro.id/api';
//if we call this method without passing any country then the country will be undefined
//and the normal url will be passed and we will get data for global.
//if country is passed we get to that country's url and get that same data for it
export const fetchData = async (country) => {
    let changeableURL = url;

    if(country){
        changeableURL = `${url}/countries/${country}`;
    }

    if(country==='Global'){
        changeableURL = url;
    }
    //since value is set to "" so no need for this second if
    try{
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableURL);
        
        const modifiedData = { confirmed, recovered, deaths, lastUpdate, country }
        return modifiedData;
    
    }catch(err){
        console.log(err.message);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map(dailyData=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCountries = async () => {
    try {
        const {data:{countries}} = await axios.get(`${url}/countries`);
        return countries.map(country=>country.name);
    } catch (error) {
        console.log(error.message);
    }
}