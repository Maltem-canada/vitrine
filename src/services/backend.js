import axios from 'axios';
import config from '../config';

export default function getAgglomeratedData() {
  return axios({
    method: 'GET',
    url: `${config.backendURL}/agglomerates`,
  });
}
