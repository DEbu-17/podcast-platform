import React from 'react'

function Input({type,name,placeholder,state,setState}) {
  return (
    <>
      <input
        onChange={(e)=>setState(e.target.value)}
        value={state}
        className="form-inputs"
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
}

export default Input