import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import ColumnLayout from '../text_layouts/foundationColumnGenerator';
import FeatureBadge from '../feature-badge/feature-badge';
import styles from './styles.scss';

let getValue, heroImage;

class Markets extends Component {
	componentWillMount() {
		getValue = (itemIndex, featureIndex) => {
			return this.props.filtered_state.products.features[featureIndex];
		};

		const image = this.props.filtered_state.heroImage ? this.props.filtered_state.heroImage : 'Slide1_Ennetcom_Business_Solutions.jpg';
		heroImage = ['/build/assets/images/', image].join('');
	}

	render() {
		return (
			<MasterLayout name={this.props.route.path.replace(/\W/, '')}>
				<div data-type="background" style={{ background: ['url(', heroImage, ')'].join(''), backgroundSize: 'cover' }}></div>
				<div className="row flush">
					<ColumnLayout data={this.props.filtered_state._default.main} _name="main" />
				</div>
				<section className="row">
					<div className="row column medium-6">
						<ColumnLayout data={this.props.filtered_state._default.mid} _name="mid" />
					</div>
					<div className="columns medium-3">
						<FeatureBadge h3={getValue(0, 2).title} h4={getValue(0, 2).desc} src={getValue(0, 2).src} />
						<FeatureBadge h3={getValue(0, 1).title} h4={getValue(0, 1).desc} src={getValue(0, 1).src} />
						<FeatureBadge h3={getValue(0, 3).title} h4={getValue(0, 3).desc} src={getValue(0, 3).src} />
					</div>
					<div className="columns medium-3">
						<FeatureBadge h3={getValue(0, 6).title} h4={getValue(0, 6).desc} src={getValue(0, 6).src} />
						<FeatureBadge h3={getValue(0, 5).title} h4={getValue(0, 5).desc} src={getValue(0, 5).src} />
						<FeatureBadge h3={getValue(0, 4).title} h4={getValue(0, 4).desc} src={getValue(0, 4).src} />
					</div>
				</section>
				<section className="row relative">
					<ColumnLayout data={this.props.filtered_state._default.sectors} renderColumnWithList="true" _name="fa-lists" />
					<div className="bg bg-city"></div>
				</section>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: {
			_default: state.site.filter((compData) => compData._key == 'markets')[0],
			products: state.site.filter((compData) => compData._key == 'products')[0][0],
		},
	};
}

export default connect(mapStateToProps)(Markets);
