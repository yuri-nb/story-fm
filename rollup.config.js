/**
 * @type {import('rollup').RollupOptions}
 */

import typescript from '@rollup/plugin-typescript';

const config = {
    input: 'src/main.ts',
    output: {
        file: 'out/story-fm.js',
        format: 'iife'
    },
    plugins: [typescript()]
};
export default config;