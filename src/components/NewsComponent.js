import React, { useState } from 'react';
import { getStoryIds } from "../Api/api";
import Story from "./Story";
import Select from 'react-select';
import Logo from "../assests/hacker-news.jpg";
import Loader from 'react-loader-spinner';
import _isEmpty from "lodash/isEmpty";

const options = [
  { value: 'jobstories', label: 'Job' },
  { value: 'topstories', label: 'Story' },
  { value: 'askstories', label: 'Ask' },
  { value: 'beststories', label: 'Best Stories' }

];

const NewsComponent = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [option, setOption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = option => {
    setLoading(true);
    setOption(option);
    setStoryIds([]);
    getStoryIds(option.value).then(({ data }) => setStoryIds(data.reverse()));
  };

  const handleDelete = (selectedId) => {
    const updatedStoryIds = storyIds.filter(storyId => storyId !== selectedId);
    setStoryIds(updatedStoryIds);
  }

  return (
    <>
      <div className="wrapper">
        <img className="logo-image" src={Logo} alt="" />
        <Select
          className="select-bar"
          value={option}
          onChange={handleChange}
          options={options}
          placeholder="Select news type..."
        />

        {loading && _isEmpty(storyIds) ? (
          <Loader
            type="Circles"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={5000}
            className="loader"
          />
        ) : (
            <>
              {!_isEmpty(storyIds) ? <span className="search-result">Search results for <span className="type">{option.label}</span></span> : <span className="search-result">Search News</span>}
              <div className="story-wrapper">
                {storyIds.map((storyId) => <Story key={storyId} storyId={storyId} handleDelete={handleDelete} />)}
              </div>
            </>
          )}
      </div>
    </>
  )
}

export default NewsComponent;
