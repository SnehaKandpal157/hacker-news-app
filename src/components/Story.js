import React, { useState, useEffect } from 'react'
import { getStory } from "../Api/api";
import Tooltip from '@material-ui/core/Tooltip';
import _isEmpty from "lodash/isEmpty";

function Story({ id, storyId, handleDelete }) {
  const [story, setStory] = useState({});
  const [read, setRead] = useState(false);
  useEffect(() => {
    getStory(storyId).then((data) => setStory(data.data))
  }, [storyId])

  const getDate = (unixDate) => {
    var postDate = new Date(unixDate * 1000);
    var today = new Date();
    const dateDiff = Math.round((today - postDate) / (1000 * 60 * 60 * 24));
    return dateDiff;
  }

  const handleRead = () => {
    setRead(!read)
  }
  return (
    !_isEmpty(story) && (
      <div className="outer-wrap" id={id}>
        <a className="story-title" href={story.url}>{story.title}</a>
        <div className="inner-wrap">
          <div className="story-details">
            <span className="story-by">By : {story.by}</span>
            <span className="story-time">Posted : {getDate(story.time) === 0 ? "Today" : `${getDate(story.time)} days ago`} </span>
          </div>
          <div className="icon-wrapper">
            {read ?
              <Tooltip className="tooltip" title="Mark as unread">
                <i className="fa fa-check fa-lg" aria-hidden="true" onClick={handleRead}></i>
              </Tooltip>
              :
              <Tooltip title="Mark as read">
                <i className="fa fa-book fa-lg" aria-hidden="true" onClick={handleRead}></i>
              </Tooltip>}
            <Tooltip title="Delete"><i className="fa fa-trash-o trash-icon fa-lg" aria-hidden="true" onClick={() => handleDelete(storyId)}></i></Tooltip>
          </div>
        </div>
      </div>
    )

  )
}

export default Story
