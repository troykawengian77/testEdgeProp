import axios from 'axios';
export const API = () => {
  let requestHeaders = {
    accept: 'application/json',
  };

  const request = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 5000,
    headers: requestHeaders,
  });

  return {
    request
  };
};
