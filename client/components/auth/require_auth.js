import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SAVE_LOCATION } from '../../actions/types';

export default function(ComposedComponent) {
	class Authentication extends Component {

		static contextTypes = {
			router: React.PropTypes.object,
			route: React.PropTypes.object
		}

		componentWillMount() {

			if (!this.props.authenticated) {
				this.props.saveLocation(this.props.route.path);
				this.context.router.push('/signin');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.props.saveLocation(this.props.route.path);
				this.context.router.push('/signin');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	const mapStateToProps = (state) => {
		return { 
			authenticated: state.auth.authenticated,
			lastLocation: state.user_details.lastLocation
		}
	}

	const mapDispatchToProps = (dispatch, ownProps) => {
		return {
			saveLocation: (location) => {
				
				dispatch({
					type: SAVE_LOCATION,
					payload: location
				});

			}
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
