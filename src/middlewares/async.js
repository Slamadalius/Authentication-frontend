export default function ({dispatch}) {
  return next => action => {
    //if actions does not have payload
    //or the payload does not have a .then property
    //we don't care about it, send it on
    if(!action.payload || !action.payload.then) {
      return next(action);
    }

    //Make sure actions promise resolves
    action.payload.then(response => {
        //create a new action with old type, but
        //replace the promise with the response data
        const newAction = {...action, payload:response};
        dispatch(newAction);
      })
  };
}
