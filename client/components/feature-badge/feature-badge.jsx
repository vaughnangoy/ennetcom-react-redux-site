import React from 'react';
import styles from './styles.scss';

function columnData(data) {
    let c = {};
    let label = React.createFactory(Labels);
    let image = React.createFactory(Image);

    if (data.justify === 'right') {
        c = {
			column1: 'column medium-9 right',
			column2: 'column medium-3',
			col1Data: label({ h3: data.h3, h4: data.h4 }),
			col2Data: image({ src: data.src }),
		};
	}
    else {
        c = {
			column2: 'column medium-9',
			column1: 'column medium-3',
			col2Data: label({ h3: data.h3, h4: data.h4 }),
			col1Data: image({ src: data.src }),
		};
	}
    return c;
}

let Image = (props) => {
    return (<img src={props.src} />);
};

let Labels = (props) => {
    return (<div>
			<h3 dangerouslySetInnerHTML={{ __html: props.h3 }}></h3>
			<h4 dangerouslySetInnerHTML={{ __html: props.h4.toUpperCase() }}></h4>
		</div>);
};

module.exports = React.createClass({
    render: function () {
        const image = '/assets/images/' + this.props.src;
        let c = columnData(this.props);

        return (<section data-type="feature-badge" className="row">
					<div className={c.column1}>{c.col1Data}</div>
					<div className={c.column2}>{c.col2Data}</div>
				</section>);
	},
});
