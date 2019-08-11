import React from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  FormSelect,
  ButtonGroup,
  Button,
  FormCheckbox
} from "shards-react";

const LatestOrders = ({ title, latestOrdersData,isSwitched, switchPosition }) => (
  <Card small className="lo-stats h-100">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="p-0">
      <Container fluid className="px-0">
        <table className="table mb-0">
          <thead className="py-2 bg-light text-semibold border-bottom">
            <tr>
              <th>Details</th>
              <th />
              {/* <th className="text-center">Status</th>
              <th className="text-center">Items</th>
              <th className="text-center">Total</th> */}
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {latestOrdersData.map((item, idx) => (
              <tr key={idx}>
                <td className="lo-stats__image">
                  <img
                    alt={item.title}
                    className="border rounded"
                    src={item.image}
                  />
                </td>
                <td className="lo-stats__order-details">
                  <span>{item.name}</span>
                </td>
                {/* <td className="lo-stats__status">
                  <div className="d-table mx-auto">
                    <Badge pill theme={getBadgeType(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </td>
                <td className="lo-stats__items text-center">{item.items}</td>
                <td className="lo-stats__total text-center text-success">
                  {item.total}
                </td> */}
                <td className="lo-stats__actions">
                <FormCheckbox
              toggle
              checked={item.status}
              className="ml-auto my-auto"
              id="conversationsEmailsToggle"
              onChange={switchPosition}
            />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </CardBody>

  </Card>
);

/**
 * Returns the badge type for a specific
 */
function getBadgeType(itemStatus) {
  const statusMap = {
    Complete: "success",
    Pending: "warning",
    Canceled: "danger"
  };

  return statusMap[itemStatus];
}

LatestOrders.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  isSwitched:PropTypes.bool,
  switchPosition:PropTypes.func,

  /**
   * The latest orders data.
   */
  latestOrdersData: PropTypes.array
};

LatestOrders.defaultProps = {
  title: "Members",
  latestOrdersData: [
    {
      name: "Zenno Bruinsma",
      image: require("../../images/sales-overview/product-sweaters.jpg"),
      status: true,
    },
    {
      name: "Pelle Vlaar",
      image: require("../../images/sales-overview/product-sweaters.jpg"),
      status: false,
    },
  ]
};

export default LatestOrders;
