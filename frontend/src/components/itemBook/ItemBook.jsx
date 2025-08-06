import './itembook.css'
import { useState } from 'react';

const ItemBook = ({ index, itemSrc, itemAlt, title, lastName, firstName, price }) => { 

  const bgColors = [
    '#CDB0EA', 
    '#383838',
    '#954300',
    '#CDB0EA', 
    '#DBD0C1',
    '#CDB0EA',
    '#34C759',
    '#7D94A3',
  ];

  const bgBorders = [
    '#954300',
    '#DBD0C1',
    '#CDB0EA',
    '#DBD0C1',
    '#7D94A3',
    '#954300',
    '#DBD0C1',
    '#34C759',
  ]

  const bgColor = bgColors[index % bgColors.length];

  const bgBorder = bgBorders[index % bgBorders.length];

  // useState para manejar el hover
  // hover es un booleano que indica si el mouse está sobre el componente
  const [hover, setHover] = useState(false)
  
  // Funciones para manejar el hover
  const handleMouseOver = () => { 
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  return (
    <div className='item-book-container'>
      <div style={hover 
          ? { backgroundColor: bgColor, border: "clamp(2px, 1vw, 10px) solid #FF76DC" } 
        : { backgroundColor: bgColor, border: `clamp(2px, 1vw, 10px) solid ${bgBorder}` }}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        className='cover-container'>
        <div className='img-container'>
          <img src={itemSrc} alt={itemAlt} height='195px' width='130px' />
        </div>
      </div>
      <div className='info-container'>
        <div className='txt-content'>
          <p className='txt-title'>{title.toUpperCase()}</p>
          <p className='txt-author'>{lastName} {firstName }</p>
        </div>
        <div className='precio-content'>
        <p>${price}</p>
        </div>
      </div>
    </div>
  )
}

export { ItemBook }