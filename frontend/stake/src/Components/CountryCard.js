import React from 'react'
import './CountryCard.css'
const CountryCard = ({country}) => {
  return (
    <div className='countcard'>
        <div className='name'>
            <img src={country.icon} alt='country icon'/>
            <p>
                {country.name}
            </p>
        </div>
        <div className='percent'>
            <div className='counter'>
                <div style={{width:`${country.percent}%`}}></div>
            </div>
            <p>
                {country.percent}%
            </p>
        </div>
    </div>
  )
}

export default CountryCard
