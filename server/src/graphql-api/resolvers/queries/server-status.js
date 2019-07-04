import { execSync } from 'child_process';
import net from 'net';
import { parseString } from 'xml2js';

import { assignPorts } from '../../../utils/server-config-parser';

import serverConfig from '../../../../server-config';

const fetchStatus = (host, port) => {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(port, host, () => {
      client.write('');
    });

    // Timeout request if need be
    setTimeout(() => {
      client.end();
      reject('Server status request timed out.');
    }, 2000);

    client.on('error', () => {
      reject('Server status request throw an error.');
    });

    // Handle data if returned
    client.on('data', (data) => {
      client.end();
      resolve(data);
    });
  });
};

const parseStatus = (host, port) => {
  return new Promise(async (resolve, reject) => {
    try{
      let response = await fetchStatus(host, port);
      parseString(response, (err, result) => {
        if (err) return reject('Server status failed to parse.');
        else resolve(result);
      });
    } catch(err){
      reject(err)
    }
  });
};

const getStatus = async (host, port) => {
  let status = await parseStatus(host, port);
  status = status.ServerStats;

  for(let key in status){
    status[key] = status[key][0];
    if(status[key] === 'Yes') status[key] = true;
    if(status[key] === 'No') status[key] = false;
  }
  return status;
};

export default {
  Server: {
    serverStatus: async parent => {
      if (!serverConfig.gameserverDevDryRun) {
        if(execSync(`screen -S serverscreen${parent.id} -Q select . ; echo $?`).toString().includes('No screen session found.')) return null;
      } else {
        return null;
      }

      const ports = assignPorts(parent.id);

      let status;
      try {
         status = getStatus('localhost', ports.port);
         status._id = `localhost:${ports.port}`
      } catch(err){
        status = null;
      }
      return status;
    }
  }
};
