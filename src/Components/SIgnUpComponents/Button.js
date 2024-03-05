import React from 'react'

function Button({text,disabled,onClick,style}) {
  return (
    <>
        <button className='btn' disabled={disabled} onClick={onClick} style={style}>{text}</button>
    </>
  )
}

export default Button