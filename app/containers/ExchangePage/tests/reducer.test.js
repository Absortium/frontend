import expect from 'expect';
import exchangePageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('exchangePageReducer', () => {
  it('returns the initial state', () => {
    expect(exchangePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
