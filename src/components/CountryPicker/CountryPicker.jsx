import React, { useEffect, useState } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountries } from '../../api'

const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([])
    
    const fetchAPI = async () =>{
        setFetchedCountries(await fetchCountries())
    }

    useEffect(()=>{
        fetchAPI();
    },[setFetchedCountries]) //enable us to select different countires

    return (
        
        <>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                    <option value="Global">Global</option>
                    {fetchedCountries.map((country,i) => 
                        <option  value={country} key={i}>{country}</option>
                    )}
                </NativeSelect>
            </FormControl>
        </>
    )
}

export default CountryPicker


//in the orignal the value is set to value=""