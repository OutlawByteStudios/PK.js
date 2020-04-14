<div align="center">

![Logo](client/src/assets/img/brand/pk-js.png)
#### Persistent Kingdoms Script Set & Admin Panel

![GitHub release](https://img.shields.io/github/release/OutlawByteStudios/PK.js.svg?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/OutlawByteStudios/PK.js.svg?style=flat-square)
[![Discord](https://img.shields.io/discord/450652484634148875.svg?style=flat-square&logo=discord)](https://discord.gg/jwM54DB)
[![Steam Group](https://img.shields.io/badge/Steam-Group-lightgrey.svg?style=flat-square)](https://steamcommunity.com/groups/persistent-kingdoms)

[![GitHub issues](https://img.shields.io/github/issues/OutlawByteStudios/PK.js.svg?style=flat-square)](https://github.com/OutlawByteStudios/PK.js/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/OutlawByteStudios/PK.js.svg?style=flat-square)](https://github.com/OutlawByteStudios/PK.js/pulls)

##### [PK.js Module System](https://github.com/OutlawByteStudios/PK.js-Module-System)
<br><br>
</div>

## Improving the Guide
**This guide is a work in progress.**

Please make an issue / contact a developer if you have any issues setting up PK.js to allow us to improve the guide to better support others in the future.

## Prerequisite
 * Dedicated Server Box or a Virtual Private Server. Note, performance may lack with the latter.
 * The above should be running a Linux OS. Note, Debian and Ubuntu are the only distributions that have been tested, so it is recommend you use one of those.
 * You require root / sudo access and know how to SSH connect to the server.
 
## Software Prerequisite
In order to start using PK.js the following pieces of software need to be installed:
 * Git
 * Node.js v12+
 * npm
 * yarn
 * MongoDB
 * screen
 * Wine4
 
The guide does not cover how to install the pieces of software listed the above. There are plenty of existing guides, that can be found via Google, which should give clear and indepth guidance on how to install them.

Once the above are installed, pm2 can be installed via npm:
```
npm install -g pm2
```

## PK.js Panel Setup
1. [Create a new user](https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart) named `pkjs`. Login as this new user.
2. Clone the PK.js repository into the new user's home folder.
```bash
git clone https://github.com/OutlawByteStudios/PK.js
```
3. Enter the repository directory.
```bash
cd PK.js
```
4. Install the Node.js packages / dependencies.
```bash
yarn install
```
5. Navigate into `server/` directory and copy the `server-config-example.js` file as `server-config.js`.
```bash
cd server;
cp server-config-example.js server-config.js;
```
6. Open the `server-config.js` file in a text editor, e.g. `vim server-config.js`.
7. Change `localhost` in line 2 to your server's IP address.
8. Add your [Steam API Key](https://steamcommunity.com/dev/apikey) between the `''` on line 7.
9. Generate a `HS256` key and insert it between the `''` on line 10. [The website](https://8gwifi.org/jwkfunctions.jsp) can generate HS256 keys, however, only the contents of `k` field in the generated output is required.
10. If you wish to change the starting port of the range gameservers are assigned, that can be changed on line 17. The default restart time of servers can be changed by editting the cron schedule on line 18.
11. Save the changes to the config file.
12. Return to the root directory of the repository.
```bash
cd ..
```
13. Give yourself permissions to execute the Log Engine.
```bash
chmod 755 log-engine/log_engine
```
13. Build the repository.
```bash
yarn run build
```
14. The server needs to run on port 80, which usually requires special access. This can be disabled with [this guide](https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode/23281401#23281401):
```bash
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```
15. pm2 can be used to manage the server instance. To create the pm2 job, run the below. Please see pm2 guides for further information on how to control the server instance via pm2.
```bash
pm2 start npm --env production --name "PKjs" -- start
```
16. Navigate to your server's IP address in the browser and you can now login to the PK.js panel. Once you are logged in proceed to the next section of this guide.

## Default Game Server Setup
When creating a new server in the panel, the server files are copied from a default directory. This must be setup before any server is created.

1. Download the [Warband dedicated server files](https://www.taleworlds.com/en/Games/Warband/Download) from the Taleworld's website.
2. Download [WSE1](https://forums.taleworlds.com/index.php?topic=324890.0) from the Taleworld's forums. Move the contents into the dedicated server files folder.
3. All sample config files and bat files can be removed from the dedicated server files.
4. Download the [PK.js Module System](https://github.com/OutlawByteStudios/PK.js-Module-System) and copy the `Persistent Kingdoms` folder into the `Modules` folder in the dedicated server files.
5. Copy the contents of the dedicated server files content to the default server folder located at `gameservers/default/` inside the PK.js repository. This can be done via SFTP. 

You can now go ahead and create servers in the PK.js Admin Panel. This feature is only accessable to the first user to login to the panel, so make sure that is you!

If you wish to change the server files for a specific server:
1. Select the server in the PK.js admin panel.
2. Get the server's ID from the URL, which is the number that comes directly after the `admin/`.
3. Navigate to the folder `gameservers/<server ID>`.
4. All the files in this folder are used for that server. You can edit these files to adjust the server and/or upload custom maps.

## Editing the Game Server Config
A game server's config can be changed in the PK.js admin panel in the Server Management tab. All config relating to the server's port, name, ban list, etc. are managed automatically, so they have been removed from the config editor.

### Changing the Scene
All major PK scenes are preinstalled in the module system, so only the server config needs changing.

Insert the relevant scene number on this line in the config: `set_map scene_<scene number>`. The scene numbers are the same as those found in the [PK Scene Pack](https://github.com/OutlawByteStudios/PK-Scene-Pack).

**Please ensure you abide by the PK Scene Pack license.**

## Making Database Backups
Make a database backup:
```
mongodump --host "localhost" --port 27017 --db "pk-js" --out backup-data/db-dump-<DD>-<MM>-19
```
Restore a backup:
```
mongorestore backup-data/db-dump-<DD>-<MM>-19
```

## Game Server Instance Management
If the panel is inaccessible the following can be used to control the game servers:
```bash
# Start the server
screen -m -d -S serverscreen<serverID> wine WSELoaderServer.exe -r "Configs/<config name>" -m "<module name>"

# Stop the server
screen -S serverscreen<serverID> -X quit

# Check server is running
screen -S serverscreen<serverID> -Q select . ; echo $?
```

## Updates
### Updating the PK.js Panel
In the PK.js directory run:
```
 git pull && yarn run build && pm2 restart PKjs
```
This will pull changes from the Github repo, build the server and the client and restart the web server.

This can be done while the server is live, providing it has been tested to ensure it won't crash. The API will remain active during a build, but the UI will go down briefly.

You should check the log_engine executable has permissions 755 as it can be lost during an update causing the log search to stop working.

### Updating the Module System
If the module system needs to be updated then the new build from the [PK.js Module System repository](https://github.com/OutlawByteStudios/PK.js-Module-System)  should be updated in the default server directory and then the other servers should be reinstalled via the "Reinstall Server" option in the Server Management tab of the admin panel. 

Note all changes to the server folder made after the server was created will be lost, including log files, config files, custom maps, etc.
