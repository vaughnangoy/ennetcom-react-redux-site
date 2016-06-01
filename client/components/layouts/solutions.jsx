import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import ColumnLayout from '../text_layouts/foundationColumnGenerator';
import FeatureBadge from '../feature-badge/feature-badge';
import styles from './styles.scss';

let getValue, heroImage;

class Solutions extends Component {
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
					<ColumnLayout data={this.props.filtered_state.main} _name="main" />
				</div>
				<section className="row">
					<div className="row column medium-8">
						<ColumnLayout data={this.props.filtered_state.mid} _name="mid" />
					</div>
					<div className="column medium-4 quote">
						<p><i className="fa fa-quote-left"></i></p>
						<blockquote dangerouslySetInnerHTML={{ __html: this.props.filtered_state.mid.quote }}></blockquote>
						<p className="right"><i className="fa fa-quote-right"></i></p>
					</div>
				</section>
				<section className="row relative fa-lists">
					<div className="bg bg-city"></div>
					<div className="column medium-4 index-priority">
						<ColumnLayout data={this.props.filtered_state.lawyer_col1} />
					</div>
					<div className="column medium-8 force-vertical index-priority">
						<ColumnLayout data={this.props.filtered_state.lawyer} renderColumnWithList="true" />
					</div>
				</section>
				<section className="row">
					<div className="row column medium-8">
						<ColumnLayout data={this.props.filtered_state.cybersecurity} _name="mid" />
					</div>
					<div className="column medium-4 quote">
						<p><i className="fa fa-quote-left"></i></p>
						<blockquote dangerouslySetInnerHTML={{ __html: this.props.filtered_state.cybersecurity.quote }}></blockquote>
						<p className="right"><i className="fa fa-quote-right"></i></p>
					</div>
				</section>
				<section className="row">
					<div className="row column medium-8">
						<ColumnLayout data={this.props.filtered_state.enterprise} _name="mid" />
					</div>
					<div className="column medium-4 quote">
						<p><i className="fa fa-quote-left"></i></p>
						<blockquote dangerouslySetInnerHTML={{ __html: this.props.filtered_state.enterprise.quote }}></blockquote>
						<p className="right"><i className="fa fa-quote-right"></i></p>
					</div>
				</section>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'Business Solutions')[0],
	};
}

export default connect(mapStateToProps)(Solutions);
