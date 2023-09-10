import './Countries.css'
import { useEffect, useState } from "react";

const Countries = () => {
    // use state
    const [countries, setCountries] = useState([])

    // use effect
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountries(data))
    }, [])

    // use state
    const [visitedCountry, setVisitedCountry] = useState([])

    const handleVisitedCountry = (country) => {
        const newVisitedCountry = [...visitedCountry, country]
        setVisitedCountry(newVisitedCountry)
    }

    return (
        <div>
            <h3>Countries : {countries?.length}</h3>
            <div>
                <h3>Visited countries:</h3>
                <p>Visited : {visitedCountry.length}</p>
                {
                    visitedCountry.map(country => <li key={country.cca3}>{country?.name?.common}</li>)
                }
            </div>
            <div className='main-container'>
                {
                    countries.map(country => <AllCountry key={country.cca2} handleVisitedCountry={handleVisitedCountry} country={country}></AllCountry>)
                }
            </div>
        </div>
    );
};

const AllCountry = ({ country, handleVisitedCountry }) => {
    const { name, flags, capital, independent, population, area, languages
    } = country;

    const [visited, setVisited] = useState(false)

    const handleVisited = () => {
        setVisited(!visited)
        !visited && handleVisitedCountry(country)
    }

    return (
        <div className={`container ${visited ? 'full-container' : ''}`}>
            <img className='container-img' src={flags.png} alt="" />
            <h2>{name?.common}</h2>
            <p>Capital : {capital}</p>
            <p>Population : {population}</p>
            <p>Area : {area}</p>
            <p>Languages : {languages?.eng && languages.eng}</p>
            <p>Independency : {independent ? 'Independent' : 'Not Independent'}</p>
            <button className='btn' onClick={handleVisited}>{visited ? 'Visited' : 'Go to Visit'}</button>
            {visited && <h4 className='h3'>I am visit this country</h4>}
        </div>
    )
}

export default Countries;