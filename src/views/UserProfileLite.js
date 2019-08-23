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

const company = {
  name:'Vanmoof',
  photo:'https://www.vanmoof.com/static/version1529406215/frontend/Elephant/vanmoof/en_US/icons/android-chrome-192x192.png'
}

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
    await this.props.getProfile(account._id);
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
        await this.props.updateAdmin(group._id, userId, !isChecked);
       }
    })
    console.log(userId);
    this.setState({members})
  }

  onUploadPhoto = (e)  => {
    var reader = new FileReader();
    reader.onloadend = () => {
      let newState = Object.assign({}, this.state);
      newState.profile.photo = reader.result
      this.setState(newState);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  onUploadIcon = (e)  => {
    var reader = new FileReader();
    reader.onloadend = () => {
      let newState = Object.assign({}, this.state);
      newState.group.icon = reader.result
      this.setState(newState);
    }
    reader.readAsDataURL(e.target.files[0]);
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
              <Button>Personal Profile</Button>
            </Tab>
            <Tab selectedClassName="v-tabs--selected" className="v-tabs">
              <Button>Company Profile</Button>
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
                  isAdmin={false}
                  isLoading={isLoading}
                />
              </Col>
              <Col lg="8">
                <UserAccountDetails
                  isAdmin={false}
                  account={profile}
                  updateAccount={() => this.onUpdateAccount()}
                  changeStringAccount={(e) => this.onChangeStringAccount(e)}
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
                isAdmin={true}
                isLoading={isLoading}
                />
                <UserTeams teams={members} />
              </Col>
              <Col lg="8">
                <UserAccountDetails isAdmin={true} account={group} changeStringGroup={(e) => this.onChangeStringGroup(e)} updateGroup={() => this.onUpdateGroup()}/>
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
                Proin pretium, leo ac pellentesque mollis, felis nunc ultrices
                eros, sed gravida augue augue mollis justo. Nulla porta dolor.
                Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi
                congue nunc, vitae euismod ligula urna in dolor.
              </p>
            </div>

            <Form>
              <div className="d-flex align-items-center">
                <FormGroup style={{ width: '90%' }}>
                  <label htmlFor="email">Email</label>
                  <FormInput
                    id="email"
                    value={this.state.inviteEmail}
                    onChange={e =>
                      this.setState({ inviteEmail: e.target.value })
                    }
                  />
                </FormGroup>
                <Button
                  onClick={() => this.onInviteUser()}
                  className="ml-2 mt-2"
                >
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
