import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import ColumnLayout from '../text_layouts/foundationColumnGenerator';
import styles from './styles.scss';

let heroImage;

class About extends Component {

	componentWillMount() {
		const image = this.props.filtered_state.heroImage ? this.props.filtered_state.heroImage : 'Slide1_Ennetcom_Business_Solutions.jpg';
		heroImage = ['/build/assets/images/', image].join('');
	}
	render() {
		return (
			<MasterLayout name="about">
				<div data-type="background" style={{ background: ['url(', heroImage, ')'].join(''), backgroundSize: 'cover' }}></div>
				<div className="row flush">
					<ColumnLayout data={this.props.filtered_state.main} _name="main" />
				</div>
				<div className="row">
					<ColumnLayout data={this.props.filtered_state.mid} _name="mid" />
				</div>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'about')[0],
	};
}

export default connect(mapStateToProps)(About);