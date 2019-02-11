import {
  AGGLOMERATE_FETCH_DATA_SUCCESS,
  AGGLOMERATE_HAS_ERRORED,
  AGGLOMERATE_IS_LOADING,
  AGGLOMERATE_LIST_FETCH_DATA_SUCCESS,
} from '../constants/action-types';

export const initialState = {
  jobs: [],
  photoWelcome: {},
  photoJobsBoard: {},
  expertise: [],
  services: [],
  ourPhilosophyPhoto: {},
  philosophyLastImage: {},
  philosophies: [],
  teammembers: [],
  locationImage: {},
  maltemLogo: {},
  cursor32x32: {},
  isLoading: false,
  hasErrored: false,
  hasLoaded: false,
  list: [],
  locationTitle: '',
  contactTitle: '',
  languagePlaceholder: '',
};
const initialSateList = {
  list: [],
  isLoading: false,
  hasErrored: false,
  hasLoaded: false,
};

export function agglomerateList(state = initialSateList, action = {}) {
  switch (action.type) {
    case AGGLOMERATE_LIST_FETCH_DATA_SUCCESS:
      return { ...state, list: action.data, hasLoaded: true };
    case AGGLOMERATE_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case AGGLOMERATE_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    default:
      return state;
  }
}

export function agglomerate(state = initialState, action = {}) {
  switch (action.type) {
    case AGGLOMERATE_FETCH_DATA_SUCCESS:
      return { ...state, ...action.data, hasLoaded: true };
    case AGGLOMERATE_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case AGGLOMERATE_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    default:
      return state;
  }
}
