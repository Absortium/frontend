import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import ExchangeBox from 'components/ExchangeBox';

describe('ExchangeBox calculations', () => {
    it('should render the logo', () => {
        var eb = ExchangeBox();

        expect(renderedComponent.find('Img').length).toEqual(1);
    });
});
