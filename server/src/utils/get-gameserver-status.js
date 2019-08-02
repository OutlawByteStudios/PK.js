import net from 'net';
import { parseString } from 'xml2js';

const fetchStatus = (host, port) => {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(port, host, () => {
      client.write('');
    });

    // Timeout request if need be
    setTimeout(() => {
      client.end();
      reject(new Error('Server status request timed out.'));
    }, 2000);

    client.on('error', () => {
      reject(new Error('Server status request throw an error.'));
    });

    // Handle data if returned
    client.on('data', data => {
      client.end();
      resolve(data);
    });
  });
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
  } catch (err){
    return {};
  }
};
