import {
  AGGLOMERATE_FETCH_DATA_SUCCESS,
  AGGLOMERATE_HAS_ERRORED,
  AGGLOMERATE_IS_LOADING,
} from '../constants/action-types';
import getAgglomeratedData from '../services/backend';

export function agglomerateHasErrored(bool) {
  return {
    type: AGGLOMERATE_HAS_ERRORED,
    hasErrored: bool,
  };
}
export function agglomerateIsLoading(bool) {
  return {
    type: AGGLOMERATE_IS_LOADING,
    isLoading: bool,
  };
}
export function agglomerateFetchDataSuccess(data) {
  return {
    type: AGGLOMERATE_FETCH_DATA_SUCCESS,
    data,
  };
}
export function agglomerateFetchData() {
  return (dispatch, getState) => {
    const {
      agglomerate: {
        isLoading,
        hasLoaded,
      },
    } = getState();

    if (isLoading || hasLoaded) return getState();

    dispatch(agglomerateIsLoading(true));
    return getAgglomeratedData()
      .then((res) => {
        dispatch(agglomerateIsLoading(false));
        dispatch(agglomerateFetchDataSuccess(res.data[0]));
        return res.data;
      })
      .catch(() => dispatch(agglomerateHasErrored(true)));
  };
}
