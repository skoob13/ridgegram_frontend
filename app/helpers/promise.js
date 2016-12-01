function warn(error) {
  throw error;
}

export default () => next => action => (
  typeof action.then === 'function'
    ? Promise.resolve(action).then(next, warn)
    : next(action)
  );
