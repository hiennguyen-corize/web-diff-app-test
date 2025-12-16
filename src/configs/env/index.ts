import dev from './dev';
import prod from './prod';
import stg from './stg';

const config = () => {
  const env = process.env.ENV;

  switch (env) {
    case 'stg':
      return stg;

    case 'prod':
      return prod;

    default:
      return dev;
  }
};

export default config();
