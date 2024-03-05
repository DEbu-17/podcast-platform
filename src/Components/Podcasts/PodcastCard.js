import React from 'react'
import "../../Css files/podcast.css"
import { Link } from 'react-router-dom';
function PodcastCard({id,title,smallImg}) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className='small-img' src={smallImg} />
        <p className='title-podcast'>{title}</p>
      </div>
    </Link>
  );
}

export default PodcastCard