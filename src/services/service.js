import axios from 'axios';

const fetchTracks = async (searchTerm) => {
  const res = await axios.get(`/search/?term="${searchTerm}"`);
  return res.data.results;
};

export default fetchTracks;
