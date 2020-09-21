import axios from 'axios';

export const baseUrl = "https://hacker-news.firebaseio.com/v0/";
export const storyUrl = `${baseUrl}item/`;

export const getStoryIds = async (option) => {
  const newsStoriesUrl = `${baseUrl}${option}`;
  const result = await axios.get(`${newsStoriesUrl}.json`).then(data => data);
  return result;
}

export const getStory = async (storyId) => {
  const result = await axios.get(`${storyUrl + storyId}.json`).then(data => data);
  return result;
}