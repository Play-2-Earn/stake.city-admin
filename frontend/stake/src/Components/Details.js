import React from 'react'
import './Details.css'

const Details = ({index , info}) => {
  return (
    <div className='contDetail'>
        <div className='detail'>
          <div className='icon-cont' style={{backgroundColor:info.color}}>
              <img src={info.src} alt='notification' />
          </div>
          <p>
            {info.title}
          </p>
        </div>
        <div className='percent'>
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" className={info.percent < 1 ? "red" : ""}>
          <g clip-path="url(#clip0_1_135)">
            <path d="M5.89251 15.3206L11.7851 9.42808L14.1421 18.8562L21.2132 11.7851" stroke={info.percent > 1 ? "#05A002" : "#E83B3B"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.6776 11.7851H21.2132V15.3206" stroke={info.percent > 1 ? "#05A002" : "#E83B3B"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_1_127">
              <rect width="20" height="20" fill="white" transform="translate(14.1421) rotate(45)"/>
            </clipPath>
          </defs>
        </svg>
        <p style={{color : info.percent > 1 ? "#05A002" : "#E83B3B"}}>
          {info.percent}%
        </p>
        </div>
            <p className='value'>
              {info.value}
            </p>
    </div>
  )
}

export default Details
