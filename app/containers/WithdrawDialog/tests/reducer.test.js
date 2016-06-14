import expect from 'expect';
import withdrawDialogReducer from '../reducer';
import { fromJS } from 'immutable';

describe('withdrawDialogReducer', () => {
  it('returns the initial state', () => {
    expect(withdrawDialogReducer(undefined, {})).toEqual(fromJS({}));
  });
});
