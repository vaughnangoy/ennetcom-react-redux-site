import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import global from './styles.scss';

import logo from '../../build/assets/images/Logo_Ennetcom_Encrypted_Network_Communications.png';
import logo2 from '../../build/assets/images/logo_white.png';
import CartIndicator from '../buttons/cartIndicator';

let headerLinks, subLinks;

const HeaderLink = React.createClass({
	render: function () {
		return (
			<div className="small-12 medium-4 columns main-links">
				<Link to={this.props.url}>{this.props.title}</Link>
			</div>
		);
	},
});

class Header extends Component {

	componentWillMount() {
		headerLinks = this.props.filtered_state.navigation.mainLinks.map((link, i) => {
			return <HeaderLink url={link.url} title={link.name} key={i} />;
		});

		subLinks = function (context) {
			const links = context.props.filtered_state.navigation.subLinks.map((link, i) => {
				return <li key={i}><Link to={['/', link.url].join('')}>{link.name}</Link></li>;
			});

			return links ? <ul className="sublinks"> {links} </ul> : null;
		}(this);
	}

	render() {
		return (
			<header className="relative">
				<nav className="row">
					<div className="colomn medium-2">
						<img className="logo" src={logo2} />
					</div>
					<div className="column medium-8">{headerLinks}</div>
					<div className="column medium-2 end relative topup">
						<div className="absolute">
							<button>{this.props.filtered_state.topup}</button>
						</div>
						<CartIndicator />
					</div>
					<div className="absoluteHorizonalCentre">{subLinks}</div>
				</nav>
				<hr />
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'header')[0],
	};
}

export default connect(mapStateToProps)(Header);