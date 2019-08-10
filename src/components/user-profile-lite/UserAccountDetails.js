import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

const UserAccountDetails = ({ account, isAdmin, updateAccount, changeStringAccount, changeStringGroup, updateGroup }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{isAdmin ? 'Company Details' : 'Account details'}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="12" className="form-group">
                  {isAdmin ? (
                    <Fragment>
                      <label htmlFor="feFirstName">Company name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="Company name"
                        onChange={changeStringGroup}
                        defaultValue={account.title}
                        name="title"
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <label htmlFor="feFirstName">Full name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="Full name"
                        defaultValue={account.name}
                        onChange={changeStringAccount}
                        name="name"
                      />
                  </Fragment>
                  ) }

                </Col>
              </Row>
              {isAdmin ? (
                null
              ) : (
                <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    defaultValue={account.email}
                    onChange={isAdmin ? changeStringGroup : changeStringAccount}
                    name="email"
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    value="EX@MPL#P@$$w0RD"
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              ) }

              {isAdmin ? (
                  <FormGroup>
                  <label htmlFor="feAddress">KVK Nummer</label>
                  <FormInput
                    id="feAddress"
                    placeholder="KVK Nummer"
                    value="65661796"
                    onChange={() => {}}
                  />
                </FormGroup>
              ) : (null)}

              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value="1234 Main St."
                  onChange={() => {}}
                />
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    placeholder="City"
                    onChange={() => {}}
                  />
                </Col>
                {/* Zip Code */}
                <Col md="6" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Button theme="accent" onClick={isAdmin ? updateGroup : updateAccount}>Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  account: PropTypes.object,
  isAdmin:PropTypes.bool,
  updateAccount: PropTypes.func,
  updateGroup:PropTypes.func,
  changeStringAccount:PropTypes.func,
  changeStringGroup:PropTypes.func
};

UserAccountDetails.defaultProps = {
  account: {
    name:"Full name",
    title: "Account Details"
  }
};

export default UserAccountDetails;
