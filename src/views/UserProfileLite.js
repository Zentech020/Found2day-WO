import React from 'react';
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormInput,
  Button
} from 'shards-react';
import {toast} from 'react-toastify';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { inviteUser,getProfile, updateProfile, getGroup, updateGroup, getMembers, updateAdmin } from '../actions';

import PageTitle from '../components/common/PageTitle';
import UserDetails from '../components/user-profile-lite/UserDetails';
import UserAccountDetails from '../components/user-profile-lite/UserAccountDetails';
import UserTeams from './../components/user-profile/UserTeams';
import LatestOrders from './../components/ecommerce/LatestOrders';
import {isAdmin} from '../helpers/isAdmin';
import amplitude from 'amplitude-js';
var employerAnalytics = amplitude.getInstance();


class UserProfileLite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteModal: false,
      manageModal: false,
      name: '',
      photo: '',
      groupId: '',
      inviteEmail: '',
      showingError: true,
      newPhoto:'',
      isAdmin:true,
      profile: {
        name:'',
        email:'',
      }
    };
  }

  inviteMember = () => {
    this.setState({
      inviteModal: true
    });
  };

  onManage = () => {
    this.setState({
      manageModal:true,
    })
  }


  inviteToggle = () => {
    this.setState({
      inviteModal: !this.state.inviteModal
    });
  };

  manageToggle = () => {
    this.setState({
      manageModal: !this.state.manageModal
    });
  };

  componentDidMount = async () => {
    const account = JSON.parse(sessionStorage.getItem('account'));
    const group = JSON.parse(sessionStorage.getItem('group'));
    // await this.props.getProfile(account._id);
    await this.props.getGroup(group._id);
    await this.props.getMembers(group._id);
    const {profile, members} = this.props;

    const memberIsAdmin = members.map(m => ({...m, isAdmin: this.props.group.admins.includes(m._id)}))

    this.setState({
      groupId: group._id,
      account:account,
      profile:profile,
      group:this.props.group,
      members:memberIsAdmin,
      message:'',
      isAdmin:isAdmin(account._id, group.admins)
    });
  }


  async componentDidUpdate(nextProps, history) {
    if (!this.props.error && !this.state.showingError) {
      if(this.props.message) {
        toast.success(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({showingError: true})
    }
    }
    if(this.props.error && !this.state.showingError) {
      if(this.props.message) {
        toast.error(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({showingError: true})
      }
    }
  }

  onInviteUser = async() => {
    const { inviteEmail, groupId } = this.state;
    if (inviteEmail && groupId) {
      this.props.inviteUser(groupId, inviteEmail);
      await this.setState({showingError: false, inviteModal: false})
    }
  };

  onSwitchPosition = (e, userId, isChecked) => {
    const {members} = this.state;
    const group = JSON.parse(sessionStorage.getItem('group'));
    members.forEach(async member => {
       if (member._id === userId) {
        member.isAdmin =  !isChecked
        this.props.updateAdmin(group._id, userId, !isChecked).then((res)=>{
          if(res.result) {
            toast.success(res.result.data.msg, {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
        })
       }
    })
    this.setState({members})
  }

  onUploadPhoto = (e)  => {
    var reader = new FileReader();
    reader.onloadend = () => {
      let newState = Object.assign({}, this.state);
      newState.profile.photo = reader.result
      this.setState(newState);
      this.props.updateProfile(newState.profile);
      this.setState({showingError: false})
    }

    reader.readAsDataURL(e.target.files[0]);
    employerAnalytics.logEvent('changePicture', {page:'profile'})
  }

  onUploadIcon = (e)  => {
    var reader = new FileReader();
    reader.onloadend = () => {
      let newState = Object.assign({}, this.state);
      newState.group.icon = reader.result
      this.setState(newState);
      this.props.updateGroup(newState.group);
      this.setState({showingError: false})
    }
    reader.readAsDataURL(e.target.files[0]);
    employerAnalytics.logEvent('changeIcon', {page:'profile'})
  }

  onChangeStringAccount = (e) => {
    const name = e.target.name
    const value = e.target.value;
    console.log(name, value);
    let newState = Object.assign({}, this.state);
    newState.profile[name] = value
    this.setState(newState);
  }

  onChangeStringGroup = (e) => {
    console.log(e.target.value);
    const name = e.target.name
    const value = e.target.value;
    let newState = Object.assign({}, this.state);
    newState.group[name] = value
    this.setState(newState);
  }

  onUpdateAccount = async () => {
    const {profile} = this.state
    this.props.updateProfile(profile)
    await this.setState({showingError: false})
  }

  onUpdateGroup = async() => {
    const {group} = this.state
    console.log(group);
    this.props.updateGroup(group)
    await this.setState({showingError: false})
  }

  render() {
    const { inviteModal, manageModal, profile, group, members } = this.state;
    const {isLoading} = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Profiles"
            subtitle="Overview"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
      </Row>
        <Tabs>
          <TabList className="v-tab d-flex align-items-center">
            <Tab selectedClassName="v-tabs--selected" className="v-tabs">
              <Button onClick={() => employerAnalytics.logEvent('viewPersonalProfile', {page:'profile'})}>Personal profile</Button>
            </Tab>
            <Tab selectedClassName="v-tabs--selected" className="v-tabs">
              <Button onClick={() => employerAnalytics.logEvent('viewCompanyProfile', {page:'profile'})}>Company profile</Button>
            </Tab>
          </TabList>

          <TabPanel>
            <Row>
              <Col lg="4">
                <UserDetails
                  inviteMember={() => this.inviteMember()}
                  management={() => this.onManage()}
                  uploadPhoto={(e) => this.onUploadPhoto(e)}
                  account={profile}
                  isAdmin={this.state.isAdmin}
                  isLoading={isLoading}
                  isPersonal={true}
                />
              </Col>
              <Col lg="8">
                <UserAccountDetails
                  isAdmin={this.state.isAdmin}
                  account={profile}
                  updateAccount={() => this.onUpdateAccount()}
                  changeStringAccount={(e) => this.onChangeStringAccount(e)}
                  isPersonal={true}
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              <Col lg="4">
                <UserDetails
                  inviteMember={() => this.inviteMember()}
                  management={() => this.onManage()}
                  uploadIcon={(e) => this.onUploadIcon(e)}
                  account={group}
                  isAdmin={this.state.isAdmin}
                  isLoading={isLoading}
                  isPersonal={false}

                />
                <UserTeams teams={members} />
              </Col>
              <Col lg="8">
                <UserAccountDetails
                  isAdmin={this.state.isAdmin}
                  isPersonal={false}
                  account={group}
                  changeStringGroup={(e) => this.onChangeStringGroup(e)}
                  updateGroup={() => this.onUpdateGroup()}
                  isLoading={isLoading}
                />
              </Col>
              </Row>
            </TabPanel>
        </Tabs>
        <Modal
          className="c-modal c-modal--invite"
          size="lg"
          open={inviteModal}
          toggle={() => this.inviteToggle()}
        >
          <ModalHeader>Invite member</ModalHeader>
          <ModalBody>
            <div>
              <p>
                Invite team members so they can place vacancies at Found2Day. Every team member can see which vacancies they personally placed. At the company profile you can allow other members to be admin.
              </p>
            </div>

            <Form>
              <div className="d-flex align-items-center">
                <FormGroup style={{ width: '90%' }}>
                  <label htmlFor="email">Email</label>
                  <FormInput
                    id="email"
                    value={this.state.inviteEmail}
                    placeholder="john.doe@gmail.com"
                    onChange={e =>this.setState({ inviteEmail: e.target.value })}
                  />
                </FormGroup>
                <Button
                  onClick={() => this.onInviteUser()}
                  className="ml-2 mt-3">
                  Add
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          className="c-modal c-modal--invite"
          size="lg"
          open={manageModal}
          toggle={() => this.manageToggle()}
        >
          <ModalHeader>Manage group</ModalHeader>
          <ModalBody>
            <LatestOrders users={members} switchPosition={(e, userId, isChecked) => this.onSwitchPosition(e, userId, isChecked)}/>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

//Connect redux
function mapStateToProps(state) {
  return {
    error: state.profile.err || state.group.err,
    isLoading:state.profile.isLoading,
    message:state.profile.message || state.group.message,
    busy:state.auth.busy,
    profile:state.profile.profile,
    group:state.group.group,
    members:state.group.members
  };
}

export default connect(
  mapStateToProps,
  { inviteUser, getProfile, updateProfile, getGroup, updateGroup, getMembers, updateAdmin }
)(UserProfileLite);
