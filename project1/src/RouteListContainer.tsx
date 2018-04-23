import RouteList from './routelist';
import { connect, Dispatch } from 'react-redux';
import Init from './init';

export function mapStateToProps(state: any) {
    return {
        routes: state.SelectedRoutes.routes
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        toggleRoute: (id: any) => {
            Init.bridge.toggleRoute(id);
        }
    }
}
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps)(RouteList);