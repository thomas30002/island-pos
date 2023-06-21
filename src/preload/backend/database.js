import { ipcRenderer } from 'electron';
import { Sequelize } from 'sequelize'

// const dbPath = `${__dirname}/assets/ipos.db`.replace('app.asar', 'app.asar.unpacked');

const path = ipcRenderer.sendSync("get-user-path");
const dbPath = `${path}/ipos.db`;

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath
})
sequelize
  .sync()
  .then((e) => {
    console.log(e);
    console.log(`DB Path: ${dbPath}`);
  })
  .catch((e) => console.log(e))
