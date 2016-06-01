import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';

class Banner extends Component {
	render() {
		return (<section data-type="component" data-section-type="banner" className="relative">
			<div data-type="background" style={{ background: ['url(', this.props.filtered_state.banner.city, ')'].join(''), backgroundSize: 'cover' }}></div>
			<div data-type="images">
				<img src={this.props.filtered_state.banner.phone} />
				<div data-type="headline" dangerouslySetInnerHTML={{ __html: this.props.filtered_state.banner.headline }}></div>
			</div>
			<div className="quote">
				<i className="fa fa-quote-left"></i>
				<blockquote dangerouslySetInnerHTML={{ __html: this.props.filtered_state.banner.quote }}></blockquote>
				<i className="fa fa-quote-right"></i>
			</div>
		</section>);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'index')[0],
	};
}

export default connect(mapStateToProps)(Banner);
