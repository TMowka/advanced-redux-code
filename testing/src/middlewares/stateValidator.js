import tv4 from 'tv4';
import stateSchema from 'middlewares/stateSchema';

export default store => next => action => {
  next(action);

  if (!tv4.validate(store.getState(), stateSchema)) {
    console.warn('Invalid state schema');
  }
};