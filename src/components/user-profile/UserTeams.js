import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Container, Row, Col } from 'shards-react';
const group = JSON.parse(sessionStorage.getItem('group'));
console.log(group);
const UserTeams = ({ title, teams }) => (
  <Card small className="user-teams mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>
    <CardBody className="p-0">
      <Container fluid>
        {teams.map((team, idx) => (
          <Row className="px-3" key={idx}>
            <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
              <img className="rounded" src={team.photo} alt={team.name} />
            </Col>
            <Col className="user-teams__info pl-3">
              <div className="d-flex align-items-center">
              <h6 className="m-0">{team.name}</h6>
              {group.admins.includes(team._id) ? <i className="material-icons ml-2">supervised_user_circle</i> : null }
              </div>
              {/* <span className="text-light">{team.members}</span> */}
            </Col>
          </Row>
        ))}
      </Container>
    </CardBody>
  </Card>
);


UserTeams.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The teams dataset.
   */
  teams: PropTypes.array
};

UserTeams.defaultProps = {
  title: 'Members',
  teams: [
    {
      photo: require('../../images/user-profile/team-thumb-1.png'),
      name: 'Steye Vindicat'
      // members: '21 Members'
    },
    {
      photo: require('../../images/user-profile/team-thumb-2.png'),
      name: 'Yuri Nereus'
      // members: '21 Members'
    },
    {
      photo: require('../../images/user-profile/team-thumb-3.png'),
      name: 'Zenno Viator'
      // members: '21 Members'
    }
  ]
};

export default UserTeams;
