import path from 'path';

/** @type {import('next').NextConfig} */
const config = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'lib');
    return config;
  },
};

export default config;
