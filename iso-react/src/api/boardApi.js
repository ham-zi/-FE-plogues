import axios from 'axios';

export const getBoardList = (category, page) => {
  return axios.get('http://localhost/api/boards', {
    params: { category, page }
  });
};