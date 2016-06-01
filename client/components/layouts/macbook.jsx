import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import ColumnLayout from '../text_layouts/foundationColumnGenerator';
import FeatureBadge from '../feature-badge/feature-badge';
import CartButton from '../buttons/cartButton';
import styles from './styles.scss';

let platforms, heroImage, product;

class MacbookLayout extends Component {
	componentWillMount() {
		heroImage = this.props.filtered_state.heroImage ? this.props.filtered_state.heroImage : '/build/assets/images/Slide1_Ennetcom_Business_Solutions.jpg';
		product = convertObjectValuesToArray(this.props.filtered_state).filter((product) => product.id === this.props.params.id)[0];
	}

	render() {
		return (
			<MasterLayout name={['custom', this.props.route.path.replace(/\W|(id)/g, '')].join('-')}>
				<div data-type="background" style={{ background: ['url(', heroImage, ')'].join(''), backgroundSize: 'cover' }}></div>
				<div className="row flush">
					<ColumnLayout data={product.main} _name="main centre-text" />
				</div>
				{platforms}
				<section className="row">
					<div className="column medium-6">
						<ColumnLayout data={product.item} renderColumnWithList="true" _name="fa-lists list-to-grey" />
					</div>
					<div className="column medium-6">
						<img src={product.image} />
					</div>
				</section>
				<div className="row column">
					<CartButton productId={product.id} />
				</div>
			</MasterLayout>
		);
	}
}

function convertObjectValuesToArray(obj) {
	let convertedObj = [];

	for (let prop in obj) {
		convertedObj.push(obj[prop]);
	}

	return convertedObj;
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'products')[0],
	};
}

export default connect(mapStateToProps)(MacbookLayout);
