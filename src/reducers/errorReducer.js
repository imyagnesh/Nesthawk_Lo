export default (state = {}, {type, payload}) => {
  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  if (requestState === 'FAIL') {
    return {...state, [requestName]: payload.message};
  }
  const {[requestName]: data, ...rest} = state;
  return rest;
};
