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
import { connect } from 'react-redux';
import { inviteUser, getMembersByGroup } from '../actions';

import PageTitle from '../components/common/PageTitle';
import UserDetails from '../components/user-profile-lite/UserDetails';
import UserAccountDetails from '../components/user-profile-lite/UserAccountDetails';
import UserTeams from './../components/user-profile/UserTeams';

class UserProfileLite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteModal: false,
      name: '',
      photo: '',
      groupId: '',
      inviteEmail: '',
      members: []
    };
  }

  inviteMember = () => {
    this.setState({
      inviteModal: true
    });
  };

  toggle = () => {
    this.setState({
      inviteModal: !this.state.inviteModal
    });
  };

  componentDidMount() {
    const account = JSON.parse(sessionStorage.getItem('account'));
    const group = JSON.parse(sessionStorage.getItem('group'));

    this.props.getMembersByGroup(group._id);

    this.setState({
      name: account.name,
      photo: account.photo,
      groupId: group._id,
    });
  }

  onInviteUser = () => {
    const { inviteEmail, groupId } = this.state;
    if (inviteEmail && groupId) {
      this.props.inviteUser(groupId, inviteEmail);
    }
  };

  render() {
    const { inviteModal, name, photo } = this.state;
    const { groups } = this.props;
    const userDetails = { name, photo };
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="User Profile"
            subtitle="Overview"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <Row>
          <Col lg="4">
            <UserDetails userDetails={userDetails} inviteMember={() => this.inviteMember()} />
            <UserTeams teams={groups.members}/>
          </Col>
          <Col lg="8">
            <UserAccountDetails />
          </Col>
        </Row>
        <Modal
          className="c-modal c-modal--invite"
          size="lg"
          open={inviteModal}
          toggle={() => this.toggle()}
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
      </Container>
    );
  }
}

//Connect redux
function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}

export default connect(
  mapStateToProps,
  { inviteUser, getMembersByGroup }
)(UserProfileLite);
