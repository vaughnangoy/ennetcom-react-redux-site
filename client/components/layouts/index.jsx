import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import Banner from '../banner/banner';
import Box1 from '../box-promo/box-promo';
import Box2 from '../box-promo/box-promo2';
import Box3 from '../box-promo/box-promo3';

class Index extends Component {

	render() {
		return (
			<MasterLayout>
				<Banner />
				<section className="row medium-uncollapse">
					<div className="colomns medium-4 layout1">
						<Box1 data={this.props.filtered_state.box_promo[0]} varient="box-promo" />
					</div>
					<div className="colomns medium-4 layout2">
						<Box2 data={this.props.filtered_state.box_promo[1]} varient="box-promo" />
					</div>
					<div className="colomns medium-4 layout3">
						<Box3 data={this.props.filtered_state.box_promo[2]} varient="box-promo" />
					</div>
				</section>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'index')[0],
	};
}

export default connect(mapStateToProps)(Index);