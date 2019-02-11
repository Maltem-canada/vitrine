import {
  AGGLOMERATE_FETCH_DATA_SUCCESS,
  AGGLOMERATE_HAS_ERRORED,
  AGGLOMERATE_IS_LOADING,
  AGGLOMERATE_LIST_FETCH_DATA_SUCCESS,
} from '../constants/action-types';
import getAgglomeratedData from '../services/backend';
import { getLanguage } from '../services/language';

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
export function agglomerateListFetchDataSuccess(data) {
  return {
    type: AGGLOMERATE_LIST_FETCH_DATA_SUCCESS,
    data,
  };
}

function getAgglomerate(list) {
  const lang = getLanguage().toLowerCase();
  const languages = list.map(a => a.language.toLowerCase());
  let agglo;
  if (languages.indexOf(lang) !== -1) {
    agglo = list.find(a => a.language.toLowerCase() === lang);
  } else if (languages.indexOf('en') !== -1) {
    agglo = list.find(a => a.language.toLowerCase() === 'en');
  } else {
    [agglo] = list;
  }
  return agglo;
}

export function agglomerateFetchData() {
  return (dispatch, getState) => {
    const {
      agglomerateList: {
        isLoading,
        hasLoaded,
        list,
      },
    } = getState();

    if (isLoading || hasLoaded) {
      const agglomerate = getAgglomerate(list);
      dispatch(agglomerateFetchDataSuccess(agglomerate));
      return agglomerate;
    }

    dispatch(agglomerateIsLoading(true));
    return getAgglomeratedData()
      .then((res) => {
        dispatch(agglomerateListFetchDataSuccess(res.data));
        const agglo = getAgglomerate(res.data);
        dispatch(agglomerateIsLoading(false));
        dispatch(agglomerateFetchDataSuccess({
          ...agglo,
          list: res.data,
        }));
        return {
          ...res.data,
          list: res.data,
        };
      })
      .catch(() => dispatch(agglomerateHasErrored(true)));
  };
}
