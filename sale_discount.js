/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Read } from './utils/read.util.js';

const main = async () => {
  const rl = new Read();
  const items = await rl.askQuestion('Please enter all the items purchased separated by a comma ');
  console.log(items);

  rl.close();
};

main();
