import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import FeatureBadge from '../feature-badge/feature-badge';
import CartButton from '../buttons/cartButton';

import styles from './styles.scss';

let getValue, product, heroImage;

class BlackBerryProduct extends Component {

	componentWillMount() {
		const image = this.props.filtered_state.heroImage ? this.props.filtered_state.heroImage : 'Slide1_Ennetcom_Business_Solutions.jpg';
		heroImage = ['/build/assets/images/', image].join('');

		product = convertObjectValuesToArray(this.props.filtered_state).filter((product) => product.id === this.props.route.path.split('/')[this.props.route.path.split('/').length - 1])[0];

		getValue = (itemIndex, featureIndex) => {
			return product.features[featureIndex];
		};
	}

	render() {
		return (
			<MasterLayout name="blackberry-product">
				<div data-type="background" style={{ background: ['url(', heroImage, ')'].join(''), backgroundSize: 'cover' }}></div>
				<h1 dangerouslySetInnerHTML={{ __html: product.title }}></h1>
				<h2 dangerouslySetInnerHTML={{ __html: product.subtitle }}></h2>
				<div className="row">
					<div className="column medium-4">
						<FeatureBadge h3={getValue(0, 0).title} h4={getValue(0, 0).desc} src={getValue(0, 0).src} />
						<FeatureBadge h3={getValue(0, 1).title} h4={getValue(0, 1).desc} src={getValue(0, 1).src} />
					</div>
					<div className="column medium-4">
						<img src={product.image} alt="" className="src" />
					</div>
					<div className="column medium-4">
						<FeatureBadge h3={getValue(0, 2).title} h4={getValue(0, 2).desc} src={getValue(0, 2).src} justify="right" />
						<FeatureBadge h3={getValue(0, 3).title} h4={getValue(0, 3).desc} src={getValue(0, 3).src} justify="right" />
					</div>
				</div>
				<div className="row column">
					<CartButton productId={product.id} />
				</div>
				<div className="row">
					<div className="column pad description" dangerouslySetInnerHTML={{ __html: product.desc }}></div>
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

export default connect(mapStateToProps)(BlackBerryProduct);