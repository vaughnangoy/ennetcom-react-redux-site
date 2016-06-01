import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import ColumnLayout from '../text_layouts/foundationColumnGenerator';
import FeatureBadge from '../feature-badge/feature-badge';
import styles from './styles.scss';

let platforms, heroImage;

class Platform extends Component {

	componentWillMount() {
		const image = this.props.filtered_state.heroImage ? this.props.filtered_state.heroImage : 'Slide1_Ennetcom_Business_Solutions.jpg';
		heroImage = ['/build/assets/images/', image].join('');

		platforms = this.props.filtered_state.platforms.map((info, i) => {
			if (info.title && info.desc && info.image) {
				return (<div className="row" key={i}>
					<div className="column medium-5">
						<h2 dangerouslySetInnerHTML={{ __html: info.title }}></h2>
						<p dangerouslySetInnerHTML={{ __html: info.desc }}></p>
					</div>
					<div className="column medium-7"><img src={['/build/assets/images/', info.image].join('')} /></div>
				</div>);
			}
		});
	}

	render() {
		return (
			<MasterLayout name={this.props.route.path.replace(/\W/, '')}>
				<div data-type="background" style={{ background: ['url(', heroImage, ')'].join(''), backgroundSize: 'cover' }}></div>
				<div className="row flush">
					<ColumnLayout data={this.props.filtered_state.main} _name="main centre-text" />
				</div>
				{platforms}
				<section className="row bg2-diagonal">
					<div className="column medium-4">
						{this.props.filtered_state.platforms[2].datapoints.map((info, i) => {
																	return (
								<div key={i}>
									<h2 dangerouslySetInnerHTML={{ __html: info.title }}></h2>
									<p dangerouslySetInnerHTML={{ __html: info.desc }}></p>
								</div>
							);
						})}
					</div>
					<div className="column medium-4">
						<img src={['/build/assets/images/', this.props.filtered_state.platforms[2].image].join('')} />
					</div>
					<div className="column medium-4">
						<p dangerouslySetInnerHTML={{ __html: this.props.filtered_state.platforms[2].mid }}></p>
						<ColumnLayout data={this.props.filtered_state.platforms[2].bulletpoints} renderColumnWithList="true" _name="fa-lists custom-list" />
					</div>
				</section>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'platform')[0],
	};
}

export default connect(mapStateToProps)(Platform);
