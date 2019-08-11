import {
  MEMBERS_BY_GROUP_IS_LOADING,
  MEMBERS_BY_GROUP_DATA,
  MEMBERS_BY_GROUP_ERROR
} from '../../actions/Group/GetMembersByGroupAction';

const initialState = {
  err: '',
  isLoading: true,
  success: false,
  members: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MEMBERS_BY_GROUP_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case MEMBERS_BY_GROUP_DATA: {
      return {
        ...state,
        isLoading: false,
        success: true,
        members: action.result.data
      };
    }

    case MEMBERS_BY_GROUP_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
