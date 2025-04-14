import axios from 'axios'

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

export const fetchAllrightVideos = async () => {
  const res = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: 'KR', // 원하는 국가 코드
      maxResults: 50,
      key: API_KEY,
    },
  })
  return res.data.items
}

export const searchYoutubeVideos = async (query) => {
    const res = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 50,
        type: 'video',
        key: API_KEY,
      },
    })
    return res.data.items
  }