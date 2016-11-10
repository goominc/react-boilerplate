import flatten, { unflatten } from 'flat';

import app from './app';

export const flattened = flatten({
  app,
});

const descriptors = {};
Object.keys(flattened).forEach(key => (descriptors[key] = {
  id: key,
  defaultMessage: flattened[key],
}));

export default unflatten(descriptors);
