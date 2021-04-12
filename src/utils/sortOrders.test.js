import React from 'react'
import {sortTypes, sortOrders, getSortFunction, sortByItemCount, sortByDate} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders.js';

describe('getSortFunction function', () => {
	it('date sort type', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});
	
	it('count sort type', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});
	
	it('sort type is null', () => {
		const result = getSortFunction(null);
		expect(result).toBeUndefined();
	});
});

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});
	
	it('orders are not objects', () => {
		const result = sortByItemCount(1, 1);
		expect(result).toBe(0);
	});
	
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};
		
		const order2 = {
			items: ['1', '2'],
		};
		
		const result = sortByItemCount(order1, order2);
		
		expect(result).toBe(0);
	});
	
	it('items are null', () => {
		const order1 = {
			items: null,
		};
		
		const order2 = {
			items: null,
		};
		
		const result = sortByItemCount(order1, order2);
		
		expect(result).toBe(0);
	});
	
	it('less items in order1 than in order2', () => {
		const order1 = {
			items: ['item1'],
		};
		
		const order2 = {
			items: ['1', '2'],
		};
		
		const result = sortByItemCount(order1, order2);
		
		expect(result).toBe(-1);
	});
	
	it('less items in order2 than in order1', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};
		
		const order2 = {
			items: ['1'],
		};
		
		const result = sortByItemCount(order1, order2);
		
		expect(result).toBe(1);
	});
});

describe('sortByDate function', () => {
	it('orders are null', () => {
		const result = sortByDate(null, null);
		expect(result).toEqual(0);
	});
	
	it('orders are not objects', () => {
		const result = sortByDate(1, 1);
		expect(result).toBe(0);
	});
	
	it('dates are null', () => {
		const order1 = {
			date: null,
		};
		
		const order2 = {
			date: null,
		};
		
		const result = sortByDate(order1, order2);
		
		expect(result).toBe(0);
	});
	
	it('date1 < date2', () => {
		const date1 = Date.now(), date2 = date1 + 1;
		
		const order1 = {
			date: date1,
		};
		
		const order2 = {
			date: date2,
		};
		
		const result = sortByDate(order1, order2);
		expect(result).toBe(1);
	});
	
	it('date1 > date2', () => {
		const date1 = Date.now(), date2 = date1 - 1;
		
		const order1 = {
			date: date1,
		};
		
		const order2 = {
			date: date2,
		};
		
		const result = sortByDate(order1, order2);
		expect(result).toBe(-1);
	});
	
	it('date1 == date2', () => {
		const date1 = Date.now(), date2 = date1;
		
		const order1 = {
			date: date1,
		};
		
		const order2 = {
			date: date2,
		};
		
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('orders is null', () => {
		const mockFunction = jest.fn();
		
		sortOrders(null, mockFunction);
		expect(mockFunction).toHaveBeenCalledTimes(0);
	});
	
	it('sortOrders function has been called', () => {
		const orders = fakeOrders;
		const mockFunction = jest.fn();
		
		sortOrders(orders, mockFunction);
		expect(mockFunction).toHaveBeenCalled();
	});
});
