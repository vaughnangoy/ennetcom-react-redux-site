import React from 'react';
import styles from './styles.scss';

let image;

module.exports = React.createClass({
	componentWillMount: function () {
		image = ['/build/assets/images/', this.props.data.src].join('');
	},

	render: function () {
		return (<section data-type="component" data-type-varient={this.props.varient}>
			<div className="row">
				<div className="column centre"><img src={image} /></div>
			</div>
			<div className="row">
				<div className="colomn medium-6 pad">
					<p dangerouslySetInnerHTML={{ __html: this.props.data.info }}></p>
				</div>
				<div className="colomn medium-6 pad">
					<a href="" className="find-out-more">Find out more <span className="cta"><i className="fa fa-chevron-circle-right"></i></span></a>
				</div>
			</div>
		</section>);
	}
});
