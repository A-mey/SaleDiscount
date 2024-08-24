/* eslint-disable import/prefer-default-export */
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export class ReadLine {
  rl = readline.createInterface({
    input,
    output,
  });

  askQuestion = async (query) => {
    const answer = await this.rl.question(query);
    return answer;
  };

  close = async () => {
    this.rl.close();
  };
}
