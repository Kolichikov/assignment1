import UpdateSettings from './UpdateSettings';
import { connect, Dispatch } from 'react-redux';
import Init from './init';
import { BusActionCreators, IState } from './ReducersCreators';

export function mapStateToProps(state: IState) {
    return {
        time: state.PollingInterval
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        toggleRoute: (interval: number) => {
            Init.store.dispatch(BusActionCreators.setPollingInterval(interval));
        }
    }
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps)(UpdateSettings);