import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'shards-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { getVacanciesByGroup, getVacanciesByAccount } from '../actions/index';

import {  Link } from 'react-router-dom';
import CardSkeleton from '../components/Animations/CardSkeleton';
import PageTitle from '../components/common/PageTitle';
import EmptyVacanciesImg from '../images/EmptyVacanciesImg.png';
import colors from '../utils/colors';
import amplitude from 'amplitude-js';
var employerAnalytics = amplitude.getInstance();

class Vacancies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancies_by_group:[],
      vacancies_by_account:[],
    }
  }

  componentDidMount =  async() => {
    const account = JSON.parse(sessionStorage.getItem('account'));
    const group = JSON.parse(sessionStorage.getItem('group'));
    await this.props.getVacanciesByGroup(group._id);
    await this.props.getVacanciesByAccount(account._id);
    this.setState({
      vacancies_by_group:this.props.vacancies_by_group,
      vacancies_by_account:this.props.vacancies_by_account,
    })

  }
  linkTo = id => {
    this.props.history.push(`/vacancy/${id}`);
  };

  render() {
    const { isLoading} = this.props;
    const GroupVacancies = ({vacancy_type}) => {
      if(vacancy_type && vacancy_type.length) {
        console.log("checking emtpy vacancies",vacancy_type.length, 'loading ----' , this.props.isLoading);
      }
      if( vacancy_type.length > 0) {
        return (
          <Row>
            {vacancy_type.map((vacancy, i) => (
              <Col lg="4" md="6" sm="12" className="mb-4" key={i}>
                <Card
                  small
                  className="card-post card-post--1"
                  onClick={() => this.linkTo(vacancy._id)}
                >
                  <div
                    className="card-post__image"
                    style={{
                      backgroundImage: `url(${vacancy.image})`
                    }}
                  />
                  <CardBody>
                    <h5 className="card-title">
                      <a href="#" className="text-fiord-blue">
                        {vacancy.title}
                      </a>
                    </h5>
                    {/* <p className="card-text d-inline-block mb-3"> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: vacancy.description
                      }}
                    />
                    <span className="text-muted">28 February 2019</span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }
      else {
        return (
          <Container>
            <Row className="my-4">
                <Col className="text-center my-4">
                  <h2>Your vacancies are empty</h2>
                  <Link to="/add-vacancy">
                    <Button onClick={() => employerAnalytics.logEvent('addVacancy' , {page:'vacancy'})} theme="accent">Add vacancy <i className="material-icons">add</i></Button>
                  </Link>
                </Col>
              </Row>
              <Row className="my-4">
                <Col className="text-center my-4">
                  <img width="50%" src={EmptyVacanciesImg} alt="empty vacancy"/>
                </Col>
            </Row>
          </Container>
        )
      }
    }


    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle
            title="Vacancies"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
          {/* Page Header :: Actions */}

          <Col sm="2" className="d-flex ml-auto my-auto justify-content-end">
            <Link to="/add-vacancy">
              <Button onClick={() => employerAnalytics.logEvent('addVacancy' , {page:'vacancy'})} theme="accent">Add vacancy <i className="material-icons">add</i></Button>
            </Link>
          </Col>
        </Row>
        <Tabs>
          <TabList className="v-tab d-flex align-items-center">
            <Tab selectedClassName="v-tabs--selected" className="v-tabs">
              <Button>All</Button>
            </Tab>
            <Tab selectedClassName="v-tabs--selected" className="v-tabs">
              <Button>My vacancies</Button>
            </Tab>
          </TabList>

          <TabPanel>
           {isLoading ? (<CardSkeleton/>) : (<GroupVacancies vacancy_type={this.state.vacancies_by_group}/>)}
          </TabPanel>
          <TabPanel>
            {isLoading ? (<CardSkeleton/>) : (<GroupVacancies vacancy_type={this.state.vacancies_by_account}/>)}
          </TabPanel>
        </Tabs>
      </Container>
    );
  }
}

Vacancies.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

Vacancies.defaultProps = {
  smallStats: [
    {
      label: 'Users',
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
      label: 'Sessions',
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
      label: 'Pageviews',
      value: '21,293',
      percentage: '3.71%',
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: colors.warning.toRGBA(0.1),
          borderColor: colors.warning.toRGBA(),
          data: [6, 6, 9, 3, 3]
        }
      ]
    },
    {
      label: 'Pages/Session',
      value: '6.43',
      percentage: '2.71%',
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: colors.salmon.toRGBA(0.1),
          borderColor: colors.salmon.toRGBA(),
          data: [0, 9, 3, 3, 3]
        }
      ]
    }
  ]
};

//Connect redux
function mapStateToProps(state) {
  return {
    vacancies_by_group: state.vacancies.vacancies_by_group,
    vacancies_by_account: state.vacancies.vacancies_by_account,
    isLoading:state.vacancies.isLoading
  };
}

export default connect(
  mapStateToProps,
  { getVacanciesByGroup, getVacanciesByAccount }
)(Vacancies);
