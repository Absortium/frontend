import expect from 'expect';
import accountBoxReducer from '../reducer';
import { fromJS } from 'immutable';

describe('accountBoxReducer', () => {
  it('returns the initial state', () => {
    expect(accountBoxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
