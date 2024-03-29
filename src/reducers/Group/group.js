import {
  GET_GROUP_IS_LOADING,
  GET_GROUP_DATA,
  GET_GROUP_ERROR
} from '../../actions/Group/GetGroupAction';

import {
  UPDATE_GROUP_IS_LOADING,
  UPDATE_GROUP_DATA,
  UPDATE_GROUP_ERROR
} from '../../actions/Group/UpdateGroupAction';

import {
  GET_MEMBERS_IS_LOADING,
  GET_MEMBERS_DATA,
  GET_MEMBERS_ERROR
} from '../../actions/Group/GetMembersAction';

import {
  UPDATE_ADMIN_IS_LOADING,
  UPDATE_ADMIN_DATA,
  UPDATE_ADMIN_ERROR
} from '../../actions/Group/UpdateAdminsAction';


const initialState = {
  isLoading: true,
  success: false,
  err: false,
  message:'',
  busy:false,
  group:[],
  members:[]
};

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_GROUP_IS_LOADING: {
    return {...state , err:false, isLoading:true}
  }

  case GET_GROUP_DATA: {
    return {...state , err:false, isLoading:false, group:action.result.data}
  }

  case GET_GROUP_ERROR: {
    return {...state , err:true, isLoading:false}
  }

  case UPDATE_GROUP_IS_LOADING: {
    return {...state , err:false, isLoading:true}
  }

  case UPDATE_GROUP_DATA: {
    return {...state , err:false, isLoading:false, group:action.result.data, message: "Sucessfully updated group"}
  }

  case UPDATE_GROUP_ERROR: {
    return {...state , err:true, isLoading:false, message: "Failed updated group"}
  }

  case GET_MEMBERS_IS_LOADING: {
    return {...state , err:false, isLoading:true}
  }

  case GET_MEMBERS_DATA: {
    return {...state , err:false, isLoading:false, members:action.result.data}
  }

  case GET_MEMBERS_ERROR: {
    return {...state , err:true, isLoading:false}
  }

  case UPDATE_ADMIN_IS_LOADING: {
    return {...state , err:false, isLoading:true}
  }

  case UPDATE_ADMIN_DATA: {
    const {msg} = action.result.data;
    return {...state , err:false, isLoading:false, message: msg}
  }

  case UPDATE_ADMIN_ERROR: {
    const {msg} = action.result.data;
    return {...state , err:true, isLoading:false, message: msg}
  }

  default:
    return state;
}
};
