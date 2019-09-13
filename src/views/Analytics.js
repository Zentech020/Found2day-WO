import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormSelect
} from "shards-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import addVacancyImg from "../images/home/add-vacancy.png";
import updateProfileImg from "../images/home/update-profile.png";
import leaveFeedbackImg from "../images/home/feedback.png";

import {
  getHomeNotification,
  getApplicationCount,
  getVacancyCount,
  getApplicantsTime,
  getVisibleVacancies
} from "../actions";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import Sessions from "../components/analytics/Sessions";
import UsersOverview from "./../components/blog/UsersOverview";
import Notification from "./../components/notification/notification";
import colors from "../utils/colors";
import amplitude from "amplitude-js";
var employerAnalytics = amplitude.getInstance();

class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    const group = JSON.parse(sessionStorage.getItem("group"));
    var recentMont = dayjs().format("YYYY-MM-DD"); // display
    var oldMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    if (group) {
      this.props.getHomeNotification();
      this.props.getApplicationCount(group._id);
      this.props.getVacancyCount(group._id);
      this.props.getApplicantsTime(group._id, oldMonth, recentMont);
      this.props.getVisibleVacancies(group._id);
    }
  };

  openChat = () => {
    employerAnalytics.logEvent("leaveFeedback");
    window.$crisp.push(["do", "chat:open"]);
  };

  render() {
    const { applicationCount, vacancyCount, visible_vacancies } = this.props;
    if (this.props.dates.length) {
      console.log(this.props.dates);
    }

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
            <Col className={"col-lg mb-4"} lg="4" md="4" sm="4" key={idx}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={idx === 0 ? applicationCount : vacancyCount}
                // percentage={stats.percentage}
                // increase={stats.increase}
                // decrease={stats.decrease}
              />
            </Col>
          ))}
          <Col className={"col-lg mb-4"} lg="4" md="4" sm="4" key={3}>
            <SmallStats
              id={`small-stats-${3}`}
              variation="1"
              // chartLabels="Open Vacancies"
              label="Open Vacancies"
              chartData={[
                {
                  label: "Today",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: colors.success.toRGBA(0.1),
                  borderColor: colors.success.toRGBA(),
                  data: [3.9, 4, 4, 9, 4]
                }
              ]}
              value={visible_vacancies}
              // percentage={stats.percentage}
              // increase={stats.increase}
              // decrease={stats.decrease}
            />
          </Col>
        </Row>

        <Row className="py-2">
          {/* Users Overview */}
          <Col lg="4" md="12" sm="12" className="mb-4">
            <Notification />
          </Col>

          {/* Users by Device */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            {this.props.applicantsTime && this.props.dates.length ? (
              <UsersOverview
                chartData={{
                  labels: this.props.dates ? this.props.dates : null,
                  datasets: [
                    {
                      label: "Applicants",
                      fill: false,
                      data: this.props.applicantsTime,
                      backgroundColor: "rgba(0,123,255,0.1)",
                      borderColor: "rgba(0,123,255,1)",
                      pointBackgroundColor: "#ffffff",
                      pointHoverBackgroundColor: "rgb(0,123,255)",
                      borderWidth: 1.5,
                      pointRadius: 0,
                      pointHoverRadius: 3
                    }
                  ]
                }}
              />
            ) : null}
          </Col>
        </Row>

        <Row className="py-2">
          <Col lg="4" className="mb-4">
            <Card small>
              <CardBody
                className="d-flex flex-column py-0"
                style={{
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundImage: `url(${addVacancyImg})`
                }}
              >
                {/* <img width={300} src={addVacancyImg} /> */}
              </CardBody>
              <CardFooter className="border-top">
                <Row>
                  <Col className="text-right view-report">
                    <Link
                      onClick={() =>
                        employerAnalytics.logEvent("addVacancy", {
                          page: "Home"
                        })
                      }
                      to="/add-vacancy"
                    >
                      Add vacancy &rarr;
                    </Link>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="4" className="mb-4">
            <Card small>
              <CardBody
                className="d-flex flex-column py-0"
                style={{
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundImage: `url(${updateProfileImg})`
                }}
              >
                {/* <img width={300} src={addVacancyImg} /> */}
              </CardBody>
              <CardFooter className="border-top">
                <Row>
                  <Col className="text-right view-report">
                    <Link
                      onClick={() =>
                        employerAnalytics.logEvent("updateProfile-CTA")
                      }
                      to="/profile"
                    >
                      Update profile &rarr;
                    </Link>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="4" className="mb-4">
            <Card small>
              <CardBody
                className="d-flex flex-column py-0"
                style={{
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundImage: `url(${leaveFeedbackImg})`
                }}
              >
                {/* <img width={300} src={addVacancyImg} /> */}
              </CardBody>
              <CardFooter className="border-top">
                <Row>
                  <Col className="text-right view-report">
                    <a href="#" onClick={() => this.openChat()}>
                      Leave feedback &rarr;
                    </a>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
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
      label: "Applicants",
      value: "2,390",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: "Total vacancies",
      value: "8,391",
      percentage: "7.21%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    }
    // {
    //   label: 'Open vacancies',
    //   value: '8,391',
    //   percentage: '7.21%',
    //   increase: false,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: true,
    //   datasets: [
    //     {
    //       label: 'Today',
    //       fill: 'start',
    //       borderWidth: 1.5,
    //       backgroundColor: colors.success.toRGBA(0.1),
    //       borderColor: colors.success.toRGBA(),
    //       data: [3.9, 4, 4, 9, 4]
    //     }
    //   ]
    // }
  ]
};

//Connect redux
function mapStateToProps(state) {
  return {
    homeNotification: state.home.notification,
    applicationCount: state.home.application_count,
    vacancyCount: state.home.vacancy_count,
    applicantsTime: state.stats.applicantsTime,
    dates: state.stats.dates,
    visible_vacancies: state.stats.visible_vacancies
  };
}

export default connect(
  mapStateToProps,
  {
    getHomeNotification,
    getApplicationCount,
    getVacancyCount,
    getApplicantsTime,
    getVisibleVacancies
  }
)(Analytics);
