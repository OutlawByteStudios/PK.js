const parseConfig = config => {
  return config
    .split('\r\n')
    .map(line => {
      if (line.startsWith('#') || line === '') return line;

      line = line.split(' ');
      const option = line[0];
      const value = line.slice(1).join(' ');

      switch (option) {
        case 'set_server_name':
        case 'set_port':
        case 'set_steam_port':
        case 'set_add_to_game_servers_list':
        case 'set_server_log_folder':
        case 'start':
          return undefined;
        default:
          return option + ' ' + value;
      }
    })
    .filter(line => line !== undefined)
    .join('\r\n');
};

const buildConfig = (server, config) => {
  return (
    `set_server_name ${server.name}\r\n` +
    `${parseConfig(config)}\r\n` +
    'start'
  );
};

export { parseConfig, buildConfig };
