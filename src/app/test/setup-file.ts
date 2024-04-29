// This file will be run before each test file

import { beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  console.log('before');
});

afterAll(() => {
  console.log('after');
});
