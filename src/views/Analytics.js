import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormSelect
} from 'shards-react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import addVacancyImg from '../images/AddVacancy.jpg';
import updateProfileImg from '../images/UpdateProfile.jpg';
import leaveFeedbackImg from '../images/LeaveFeedback.jpg';

import { getHomeNotification , getApplicationCount, getVacancyCount, getApplicantsTime} from '../actions';

import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import Sessions from '../components/analytics/Sessions';
import UsersOverview from "./../components/blog/UsersOverview";
import Notification from "./../components/notification/notification";


import colors from '../utils/colors';
class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const group = JSON.parse(sessionStorage.getItem('group'));
    if (group) {
      this.props.getHomeNotification();
      this.props.getApplicationCount(group._id);
      this.props.getVacancyCount(group._id);
      this.props.getApplicantsTime(group._id, '2019-09-01', '2019-10-01');
    }
  }
  render() {
    const { homeNotification, applicationCount, vacancyCount } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-2">
          {/* Page Header :: Title */}
          <PageTitle
            title="Home"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row className="py-2">
          {this.props.smallStats.map((stats, idx) => (
            <Col className={'col-lg'} lg="4" md="4" sm="4" key={idx}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={idx === 0 ? applicationCount : vacancyCount}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row className="py-2">
        {/* Users Overview */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <Notification/>
        </Col>

        {/* Users by Device */}
        <Col lg="8" md="6" sm="12" className="mb-4">
          <UsersOverview />
        </Col>
      </Row>
      <Row className="py-2">
        <Col lg="4">
          <Card small >
          <CardBody className="d-flex flex-column py-0" style={{height:'200px',backgroundSize:'cover',backgroundImage:`url(${addVacancyImg})`}}>
              {/* <img width={300} src={addVacancyImg} /> */}
          </CardBody>
            <CardFooter className="border-top">
              <Row>
                <Col className="text-right view-report">
                  <Link to="/add-vacancy">Add vacancy &rarr;</Link>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>

        <Col lg="4">
          <Card small >
          <CardBody className="d-flex flex-column py-0" style={{height:'200px',backgroundSize:'cover',backgroundImage:`url(${updateProfileImg})`}}>
              {/* <img width={300} src={addVacancyImg} /> */}
          </CardBody>
            <CardFooter className="border-top">
              <Row>
                <Col className="text-right view-report">
                  <Link to="/profile">Update Profile &rarr;</Link>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>

        <Col lg="4">
          <Card small >
          <CardBody className="d-flex flex-column py-0" style={{height:'200px',backgroundSize:'cover',backgroundImage:`url(${leaveFeedbackImg})`}}>
              {/* <img width={300} src={addVacancyImg} /> */}
          </CardBody>
            <CardFooter className="border-top">
              <Row>
                <Col className="text-right view-report">
                  <Link to="/help">Leave Feedback &rarr;</Link>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
{/*
        <Row>
          <Col lg="6" sm="12" className="mb-4" key={1}>
            <Card small className="card-post card-post--aside card-post--1">
              <div
                className="card-post__image"
                style={{
                  backgroundImage: `url(${require('../images/content-management/1.jpeg')})`
                }}
              />
              <CardBody>
                <h5 className="card-title">
                  <a className="text-fiord-blue" href="#">
                    This is our first week launching the beta platform
                  </a>
                </h5>
                <p className="card-text d-inline-block mb-3">
                  {homeNotification}
                </p>
                <span className="text-muted">28 February 2019</span>
              </CardBody>
            </Card>
            <div className="d-flex mt-4">
              {this.props.smallStats.map((stats, idx) => (
                <Col
                  className={
                    'col-lg' +
                    (idx === 0 ? ' pl-0' : '') +
                    (idx === 1 ? ' pr-0' : '')
                  }
                  lg="6"
                  md="4"
                  sm="6"
                  key={idx}
                >
                  <SmallStats
                    id={`small-stats-${idx}`}
                    variation="1"
                    chartData={stats.datasets}
                    chartLabels={stats.chartLabels}
                    label={stats.label}
                    value={idx === 0 ? applicationCount : vacancyCount}
                    percentage={stats.percentage}
                    increase={stats.increase}
                    decrease={stats.decrease}
                  />
                </Col>
              ))}
            </div>
          </Col>
          <Col lg="6" md="12" sm="12" className="mb-4">
            <Sessions />
          </Col>
        </Row> */}

        {/* Small Stats Blocks */}
        <Row />

        <Row />
      </Container>
    );
  }
}

Analytics.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

Analytics.defaultProps = {
  smallStats: [
    {
      label: 'Applicants',
      value: '2,390',
      percentage: '12.4%',
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: 'Open vacancies',
      value: '8,391',
      percentage: '7.21%',
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    },
    {
      label: 'Open vacancies',
      value: '8,391',
      percentage: '7.21%',
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    }
  ]
};

//Connect redux
function mapStateToProps(state) {
  return {
    homeNotification: state.home.notification,
    applicationCount:state.home.application_count,
    vacancyCount:state.home.vacancy_count,
    applicantsTime: state.stats.applicantsTime
  };
}

export default connect(
  mapStateToProps,
  { getHomeNotification,getApplicationCount, getVacancyCount, getApplicantsTime }
)(Analytics);
