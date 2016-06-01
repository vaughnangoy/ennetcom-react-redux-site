import React from 'react';
import global from './styles.scss';

import Header from '../header/component';
import Footer from '../footer/footer';

module.exports = React.createClass({
	render: function () {
		return 	(
			<section className={this.props.name}>
				<div className={['container', this.props.headerClass].join(' ')} data-section-type="header"><Header /></div>
				<div className={['container', this.props.bodyClass].join(' ')} data-section-type="body">{this.props.children}</div>
				<div className={['container', this.props.footerClass].join(' ')} data-section-type="footer"><Footer /></div>
			</section>
		);
	},
});
