import React from 'react';
import { Link , withRouter} from 'react-router-dom';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';
import {connect} from 'react-redux';
import {getProfile, logoutUser} from '../../../../actions';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      name: ''
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentDidMount = async () => {
    const account = JSON.parse(sessionStorage.getItem('account'));
    if(account && sessionStorage.getItem('jwtToken')) {
      await this.props.getProfile(account._id);
    }
    if (this.props.profile) {
      this.setState({
        profile:this.props.profile
      });
    }
  }

  onLogout = () => {
    this.props.logoutUser().then((res)=> {
      window.location.reload();
      this.props.history.push('/logout');
    });
  }

  render() {
    const { profile } = this.state;
    return (
      <NavItem tag={Dropdown} className="d-flex" caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="d-flex align-items-center text-nowrap px-3">
        <div className="mr-2" style={{borderRadius:'50%',height:'40px',width:'40px',backgroundSize:'cover',backgroundImage:`url(${profile ? profile.photo : ''})`}} />
          <span className="d-none d-md-inline-block">{profile ? profile.name : 'loading'}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.onLogout()} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

//Connect redux
function mapStateToProps(state) {
  return {
    profile: state.profile.profile,
    error: state.vacancies.err,
    message:state.vacancies.message,
    busy:state.vacancies.busy
  };
}


export default withRouter(connect(mapStateToProps, {getProfile, logoutUser}) (UserActions));
