import fs from 'fs';
import path from 'path';

export default {
  Server: {
    modules: async parent => {
      const currentGameserverPath = path.join(
        require.resolve('gameservers'),
        `../${parent.id}`
      );
      if (!fs.existsSync(currentGameserverPath))
        throw new Error('Server folder does not exist!');

      const modulesFolder = path.join(currentGameserverPath, `/Modules`);
      if (!fs.existsSync(modulesFolder))
        throw new Error('Module does not exist!');

      let modules = fs.readdirSync(modulesFolder, { withFileTypes: true });
      modules = modules.filter(folder => folder.isDirectory());
      modules = modules.map(module => module.name);
      return modules;
    }
  }
};
