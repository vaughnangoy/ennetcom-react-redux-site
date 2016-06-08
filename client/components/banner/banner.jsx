import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';

let city = '', headline = '', quote = '', phone = '';

export class Banner extends Component {

	componentWillMount() {

		if (this.props.filtered_state && this.props.filtered_state.banner) {
			let filtered_state = this.props.filtered_state;

			city = filtered_state.banner.city || '';
			headline =  filtered_state.banner.headline || '';
			quote =  filtered_state.banner.quote || '';
			phone =  filtered_state.banner.phone || '';
		}
		

	}

	render() {
		return (<section data-type="component" data-section-type="banner" className="relative">
			<div data-type="background" style={{ background: ['url(', city, ')'].join(''), backgroundSize: 'cover' }}></div>
			<div data-type="images">
				<img src={phone} />
				<div data-type="headline" dangerouslySetInnerHTML={{ __html: headline }}></div>
			</div>
			<div className="quote">
				<i className="fa fa-quote-left"></i>
				<blockquote dangerouslySetInnerHTML={{ __html: quote }}></blockquote>
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
