import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export async function fetchToken() {
  try {
    const { data } = await movieApi.get('/authentication/token/new');

    const token = data.request_token;
    if (data.success) {
      localStorage.setItem('requestToken', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createSessionId() {
  const token = localStorage.getItem('requestToken');

  if (token)
    try {
      const {
        data: { session_id: sessionId },
      } = movieApi.post('/authentiacation/session/new', {
        request_token: token,
      });

      localStorage.setItem('sessionId', sessionId);
    } catch (error) {
      console.log(error);
    }
}
