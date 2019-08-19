import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";


class Notification extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100 mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex flex-column py-0">
          <div className="mt-4 mb-2">
            <h5 className="card-title mb-0">This is our first week launching the beta platform</h5>
          </div>
          <p>Hi, welkom op Found2Day! Heb jij jouw droombaan al gevonden? Help ons met het geven van feedback zodat wij nog beter kunnen worden en like onze pagina op Facebook!</p>
        </CardBody>
      </Card>
    );
  }
}

Notification.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

Notification.defaultProps = {
  title: "Message from Found2Day",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  }
};

export default Notification;
