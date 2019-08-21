import axios from 'axios';
import { parseString } from 'xml2js';

const fetchStatus = async (host, port) => {
  return (await axios.get(`http://${host}:${port}`)).data;
};

const parseStatus = (host, port) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetchStatus(host, port);
      parseString(response, (err, result) => {
        if (err) return reject(new Error('Server status failed to parse.'));
        else resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default async (host, port) => {
  try {
    let status = await parseStatus(host, port);
    status = status.ServerStats;

    for (let key in status) {
      status[key] = status[key][0];
      if (status[key] === 'Yes') status[key] = true;
      if (status[key] === 'No') status[key] = false;
    }
    return status;
  } catch (err) {
    return {};
  }
};
