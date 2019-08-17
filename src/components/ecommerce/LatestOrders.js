import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  FormCheckbox
} from "shards-react";
import {isAdmin} from '../../helpers/isAdmin';

const LatestOrders = ({ title, users,isSwitched, switchPosition}) => (
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
            {users.map((user) => {
              return (
                <tr key={user._id}>
                <td className="lo-stats__image">
                  <img
                    alt={user.name}
                    className="border rounded"
                    src={user.photo}
                  />
                </td>
                <td className="lo-stats__order-details">
                  <span>{user.name}</span>
                </td>
                <td className="lo-stats__actions">
                  <FormCheckbox
                    toggle
                    checked={user.isAdmin}
                    value={user._id}
                    className="ml-auto my-auto"
                    id={user._id}
                    data-checked={user.isAdmin}
                    onChange={(e) => switchPosition(e, user._id, user.isAdmin)}
                  />
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
    </CardBody>

  </Card>
);

/**
 * Returns the badge type for a specific
 */

LatestOrders.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  isSwitched:PropTypes.bool,
  switchPosition:PropTypes.func,
  isAdmin:PropTypes.func,

  /**
   * The latest orders data.
   */
  users: PropTypes.array
};

LatestOrders.defaultProps = {
  title: "Members",
  user: [
    {
      name: "Zenno Bruinsma",
      photo: require("../../images/sales-overview/product-sweaters.jpg"),
    },
    {
      name: "Pelle Vlaar",
      photo: require("../../images/sales-overview/product-sweaters.jpg"),
    },
  ]
};

export default LatestOrders;
