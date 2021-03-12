import React from 'react'

import {fakeOrders} from "../data/fakeOrders";
import Order from "./Order";

jest.mock('../utils/getDate');
import {getDate} from "../utils/getDate";

import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
configure({adapter: new Adapter()});

describe('Order.js', () => {
	beforeEach( () => {
		getDate.mockReturnValue('11 марта');
	});
	
	afterEach( () => {
		getDate.mockClear();
	});
	
	it('order is null', () => {
		const wrapper = shallow(<Order
			order = {null}
		/>);
		
		expect(getDate).toHaveBeenCalledTimes(0);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('order date and items are null', () => {
		const order = {
			id: 123,
			date: null,
			shop: 'Alihandro Express',
			items: null
		}
		
		const wrapper = shallow(<Order
			order = {order}
		/>);
		
		expect(getDate).toHaveBeenCalledTimes(0);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('render with some fake data', () => {
		const order = fakeOrders[0];
		
		const wrapper = shallow(<Order
			order = {order}
		/>);
		
		expect(getDate).toHaveBeenCalledTimes(1);
		expect(wrapper).toMatchSnapshot();
	});
});

