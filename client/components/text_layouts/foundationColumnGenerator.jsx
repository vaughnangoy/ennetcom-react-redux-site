import React from 'react';
import styles from './styles.scss';
import _ from 'underscore';

let props = {};

function resolveText(text, Component) {
	return !_.isUndefined(text) && !_.isEmpty(text) ? Component(text) : null;
}

function renderColumns(columnData, spanBy) {
	return columnData.map((data, index) => {
		let cn = 'column medium-' + spanBy;
		let heading = resolveText(data.heading, h2);
		let body = !_.isUndefined(props.renderColumnWithList) && (props.renderColumnWithList === 'true') ? resolveList(data.list) : resolveText(data.body, p);
		return (
			<div className={cn} key={index}>
				{heading}
				{body}
			</div>);
	});
}

function getView() {
	let count = _.isNumber(props.data.columnCount) ? props.data.columnCount : parseInt(props.data.columnCount.replace(/[^1-9]/g, ''));
	let columns = _.isNaN(count) ? 0 : count;
	if (columns > 0) {
		let spanBy = 12 / columns;
		return renderColumns(props.data.columnData, spanBy);
	}
	else {
		return null;
	}
}

function resolveList(list) {
	let li = list.map((obj, index) => {
		let c = 'fa ' + obj.icon;
		return <li key={index}><span className={c}></span><span className="text" dangerouslySetInnerHTML={{ __html: obj.caption }}></span></li>;
	});
	return (<ul>{li}</ul>);
}

function h2(title) {
	return (<h2 dangerouslySetInnerHTML={{ __html: decodeURIComponent(title) }}></h2>);
}

function p(text) {
	return (<p dangerouslySetInnerHTML={{ __html: decodeURIComponent(text) }}></p>);
}


module.exports = React.createClass({
	render: function () {
		props = this.props;
		let view = !_.isUndefined(this.props.data.columnCount) ? getView() : null;
		let heading = !_.isUndefined(this.props.data.masterHeader) && !_.isEmpty(this.props.data.masterHeader) ? h2(this.props.data.masterHeader) : null;

		return (<section data-type="component" className={this.props._name}>
			{heading}
			{view}
		</section>);
	},
});
