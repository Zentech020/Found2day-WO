import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand } from 'shards-react';
import {connect} from 'react-redux';

import { Dispatcher, Constants } from '../../../flux';

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupIcon:'',
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }
  componentDidMount = () => {
    const group = JSON.parse(sessionStorage.getItem('group'));
    if(group) {
      this.setState({
        groupIcon: group.icon
      })
    }
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {
    const { hideLogoText } = this.props;
    const {groupIcon} = this.state;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: '25px' }}
          >
            <div className="d-flex justify-content-center align-items-center m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: '40px' }}
                src={groupIcon}
                alt="Shards Dashboard"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">Found2Day</span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
