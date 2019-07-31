import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter
} from 'shards-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { getHomeNotification } from '../actions';

import PageTitle from '../components/common/PageTitle';
import RangeDatePicker from '../components/common/RangeDatePicker';
import SmallStats from '../components/common/SmallStats';
import TopReferrals from '../components/common/TopReferrals';
import CountryReports from '../components/common/CountryReports';
import Sessions from '../components/analytics/Sessions';
import UsersByDevice from '../components/analytics/UsersByDevice';
import GoalsOverview from '../components/analytics/GoalsOverview/GoalsOverview';

import colors from '../utils/colors';
class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getHomeNotification();
  }
  render() {
    const { homeNotification } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle
            title="Home"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
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
                  {homeNotification.notification}
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
                    value={stats.value}
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
        </Row>

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
    }
    // {
    //   label: 'Pageviews',
    //   value: '21,293',
    //   percentage: '3.71%',
    //   increase: true,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: false,
    //   datasets: [
    //     {
    //       label: 'Today',
    //       fill: 'start',
    //       borderWidth: 1.5,
    //       backgroundColor: colors.warning.toRGBA(0.1),
    //       borderColor: colors.warning.toRGBA(),
    //       data: [6, 6, 9, 3, 3]
    //     }
    //   ]
    // },
    // {
    //   label: 'Pages/Session',
    //   value: '6.43',
    //   percentage: '2.71%',
    //   increase: false,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: true,
    //   datasets: [
    //     {
    //       label: 'Today',
    //       fill: 'start',
    //       borderWidth: 1.5,
    //       backgroundColor: colors.salmon.toRGBA(0.1),
    //       borderColor: colors.salmon.toRGBA(),
    //       data: [0, 9, 3, 3, 3]
    //     }
    //   ]
    // }
  ]
};

//Connect redux
function mapStateToProps(state) {
  return {
    homeNotification: state.homeNotification
  };
}

export default connect(
  mapStateToProps,
  { getHomeNotification }
)(Analytics);
