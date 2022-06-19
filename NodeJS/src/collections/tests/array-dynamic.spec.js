import MyArray from '../array-dynamic.js';
import chalk from 'chalk';

jest.mock('chalk');

describe('dynamic-array tests', () => {
  test('should be ran', () => {
    console.log(chalk);
    expect(1).toBe(1);
  });
});
