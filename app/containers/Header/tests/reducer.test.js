import expect from 'expect';
import headerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('headerReducer', () => {
  it('returns the initial state', () => {
    expect(headerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
