import expect from 'expect';
import exchageBoxReducer from '../reducer';
import { fromJS } from 'immutable';

describe('ExchangeBoxReducer', () => {
  it('returns the initial state', () => {
    expect(exchageBoxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
