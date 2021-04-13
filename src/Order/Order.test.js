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
	
	it('order is null, snapshot matched', () => {
		const wrapper = shallow(<Order
			order = {null}
		/>);
		
		expect(wrapper.getElement()).toBeNull();
	});
	
	it('order is null, getDate has not been called', () => {
		shallow(<Order
			order = {null}
		/>);
		
		expect(getDate).toHaveBeenCalledTimes(0);
	});
	
	it('order date and items are null, snapshot matched', () => {
		const order = {
			id: 123,
			date: null,
			shop: 'Alihandro Express',
			items: null
		}
		
		const wrapper = shallow(<Order
			order = {order}
		/>);
		
		expect(wrapper.getElement()).toBeNull();
	});
	
	it('order date and items are null, getDate has not been called', () => {
		const order = {
			id: 123,
			date: null,
			shop: 'Alihandro Express',
			items: null
		}
		
		shallow(<Order
			order = {order}
		/>);
		
		expect(getDate).toHaveBeenCalledTimes(0);
	});
	
	it('render with some fake data, snapshot matched', () => {
		const order = fakeOrders[0];
		
		const wrapper = shallow(<Order
			order = {order}
		/>);
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('render with some fake data, getDate called', () => {
		const order = fakeOrders[0];
		
		shallow(<Order
			order = {order}
		/>);
		
		expect(getDate).toHaveBeenCalledTimes(1);
	});
});

