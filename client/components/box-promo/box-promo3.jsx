import React from 'react';
import styles from './styles.scss';

module.exports = React.createClass({
	render: function () {
		return (<section className="row" data-type="component" data-type-varient={this.props.varient}>
			<div className="columns">
				<h3>{this.props.data.h3}</h3>
				<h4 dangerouslySetInnerHTML={{ __html: this.props.data.h4 }}></h4>
				<a href={this.props.data.contact_us.url} className="contact">{this.props.data.contact_us.text} <i className="fa fa-chevron-circle-right"></i></a>
			</div>
		</section>);
	}
});
