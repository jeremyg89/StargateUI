import type { Config } from 'jest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { createCjsPreset } = require('jest-preset-angular/presets') as {
  createCjsPreset: () => Config;
};

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
