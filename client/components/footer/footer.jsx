import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './styles.scss';

let footerLinks;

class Footer extends Component {

	componentWillMount() {
		footerLinks = this.props.filtered_state.product_links.links.map((link, i) => {
			return <Link to={['/', link.url].join('')} key={i}>{link.name}</Link>;
		});
	}

	render() {
		return (
			<footer className="row" data-type="component">
				<div className="column medium-3">
					<h3>{this.props.filtered_state.offices[0].title}</h3>
					<address>
						<span>{this.props.filtered_state.offices[0].address_line_1}</span>
						<span>{this.props.filtered_state.offices[0].address_line_2}</span>
						<span>{this.props.filtered_state.offices[0].tel}</span>
						<span>{this.props.filtered_state.offices[0].email}</span>
					</address>
				</div>
				<div className="column medium-3">
					<h3>{this.props.filtered_state.offices[1].title}</h3>
					<address>
						<span>{this.props.filtered_state.offices[1].address_line_1}</span>
						<span>{this.props.filtered_state.offices[1].address_line_2}</span>
						<span>{this.props.filtered_state.offices[1].tel}</span>
						<span>{this.props.filtered_state.offices[1].email}</span>
					</address>
				</div>
				<div className="column medium-3">
					<h3>{this.props.filtered_state.product_links.title}</h3>
					<p className="product-links">{footerLinks}</p>
				</div>
				<div className="column medium-3">
					<h3>{this.props.filtered_state.bbm_trade_notice.title}</h3>
					<p>{this.props.filtered_state.bbm_trade_notice.info}</p>
				</div>
			</footer>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'footer')[0],
	};
}

export default connect(mapStateToProps)(Footer);





