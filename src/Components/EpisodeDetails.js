import React from 'react'
import Button from './SIgnUpComponents/Button'

function EpisodeDetails({index,title,description,audioFile,onClick}) {
  return (
    <div style={{width:"95vw"}}>
      <h2 style={{ textAlign: "left !important", width: "400px",marginTop:"-50px" }}>{index}. {title}</h2>
      <p style={{width:"80%",marginLeft:"162px", marginTop:"-25px"}}>{description}</p>
      <Button text="play" onClick={() => onClick(audioFile)} style={{width:"10%",marginLeft:"160px",marginBottom:"80px"}} />
    </div>
  );
}

export default EpisodeDetails