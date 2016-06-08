jest.unmock('../../../components/banner/banner.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Banner } from '../../../components/banner/banner.jsx';

function config() {
	const state = {
		banner: {
			city: 'london.jpg',
			headline: 'test headline',
			quote: 'be the better version of you',
			phone: 'testImage.jpg'
		}
	}
	const renderer = TestUtils.createRenderer();
  	renderer.render(<Banner filtered_state={state} />);
  	let output = renderer.getRenderOutput();

  	const domComponent = TestUtils.renderIntoDocument(<Banner filtered_state={state} />);

  	return {
  		component: output,
  		DOMComponent: domComponent,
  		state : state
  	}
}

function elementToHaveShape(elementConfig = [], component) {

	return elementConfig.reduce((lastVal, currentObject) => {
		return lastVal && currentObject.key == 'type' ? component[currentObject.key] == currentObject.val : component.props[currentObject.key] == currentObject.val;
	}, true);
}

describe('Banner Component', () => { 

	const {component} = config(); 

	it('has the correct shape', () => {
		let attributes = [{key: 'type', val: 'section'}, {key: 'data-type', val:'component'}, {key:'data-section-type', val:'banner'}, {key: 'className', val:'relative'}];
		expect(elementToHaveShape(attributes, component)).toBeTruthy();
	}); 

	describe('has the required nodes', () => {

		it('has 3 divs', () => {
			const result = component.props.children.filter( (child) => {
				return child.type == 'div';
			});
			expect(result.length).toBe(3);
		})

		it('has the the required data-type or className', () => {
			const result = component.props.children.filter( (child) => {
				return child.props['data-type'] == 'background' || child.props['data-type'] == 'images' || child.props.className == 'quote';
			});
			expect(result.length).toBe(3);
		})

	})

	describe('the state is rendered correctly', () => {

		const {DOMComponent, state} = config();

		it('renders the correct image', () => {
			let renderedDOM = TestUtils.findAllInRenderedTree(DOMComponent, (comp) => {
				let node = ReactDOM.findDOMNode(comp);
				return state.banner.phone == node.getAttribute('src') && comp.tagName == 'IMG';
			});
			expect(renderedDOM.length).toBe(1); 
		});

		it('renders the correct headline', () => {
			let renderedDOM = TestUtils.findAllInRenderedTree(DOMComponent, (comp) => {
				let node = ReactDOM.findDOMNode(comp);
				return node.getAttribute('data-type') == 'headline';
			});
			expect(renderedDOM.length).toBe(1); 
			expect(renderedDOM[0].textContent).toEqual(state.banner.headline); 
		});

		it('renders the correct quote', () => {
			let renderedDOM = TestUtils.findAllInRenderedTree(DOMComponent, (comp) => {
				let node = ReactDOM.findDOMNode(comp);
				return comp.tagName == 'BLOCKQUOTE';
			});
			expect(renderedDOM.length).toBe(1); 
			expect(renderedDOM[0].textContent).toEqual(state.banner.quote); 
		});

		it('has the correct background image', () => {
			let renderedDOM = TestUtils.findAllInRenderedTree(DOMComponent, (comp) => {
				let node = ReactDOM.findDOMNode(comp);
				let regEx = new RegExp('url\\(' + state.banner.city + '\\)');
				return regEx.test(node.getAttribute('style'));
			});
			expect(renderedDOM.length).toBe(1); 
		});

	});

});  
