import React from 'react'
import './TableButton.css'

const TableButton = ({btn , widget , setWidget}) => {
  return (
    <div className='buttonn' onClick={() => setWidget(btn.data)} style={btn.data === widget ? {background:'white'}: {}}>
        <div className='content'>
        <div className='icon-cont' style={{background:btn.color}}>
              <img src={btn.img} alt='notification' />
          </div>
          <p>
            {btn.label}
          </p>
        </div>
    </div>
  )
}

export default TableButton
