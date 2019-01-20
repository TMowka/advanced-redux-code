export default store => next => action => {
  // Check to see if the action has a promise on it's "payload" property
  // If it does, then wait for it to resolve
  // If doesn't, then send the action on the next middleware
  if (!(action.payload instanceof Promise)) {
    return next(action);
  }

  // We want to wait fot the promise to resolve
  // (get it's data!!!) and then create a new action with that data and dispatch it
  action.payload
    .then(response => {
      const newAction = {
        ...action,
        payload: response
      };

      store.dispatch(newAction);
    });
};