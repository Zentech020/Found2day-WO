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
  Button
} from "shards-react";
import ButtonLoader from '../Animations/ButtonLoader';

const UserAccountDetails = ({ account, isLoading, isAdmin, updateAccount, changeStringAccount, changeStringGroup, updateGroup , isPersonal}) => (
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
                  {!isPersonal ? (
                    <Fragment>
                      <label htmlFor="feFirstName">Company name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="Company name"
                        onChange={changeStringGroup}
                        defaultValue={account.title}
                        name="title"
                        readOnly={!isAdmin}
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
              {!isPersonal ? (
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
                    readonly
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
                    onChange={isAdmin ? changeStringGroup : changeStringAccount}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              ) }
              {!isPersonal ? (
                  <FormGroup>
                  <label htmlFor="feAddress">KVK Nummer</label>
                  <FormInput
                    id="feAddress"
                    placeholder="KVK Nummer"
                    name="kvk"
                    defaultValue={account.kvk}
                    onChange={isAdmin ? changeStringGroup : changeStringAccount}
                    readOnly={!isAdmin}
                  />
                </FormGroup>
              ) : (null)}

              {!isPersonal ? (
                <Fragment>
                  <FormGroup>
                    <label htmlFor="feAddress">Address</label>
                    <FormInput
                      id="feAddress"
                      placeholder="Address"
                      name="address"
                      defaultValue={account.address}
                      onChange={isAdmin ? changeStringGroup : changeStringAccount}
                      readOnly={!isAdmin}
                    />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feCity">City</label>
                    <FormInput
                      id="feCity"
                      placeholder="City"
                      name="city"
                      defaultValue={account.city}
                      onChange={isAdmin ? changeStringGroup : changeStringAccount}
                      readOnly={!isAdmin}
                    />
                  </Col>
                  {/* Zip Code */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feZipCode">Zip</label>
                    <FormInput
                      id="feZipCode"
                      placeholder="Zip"
                      name="zip"
                      defaultValue={account.zip}
                      onChange={isAdmin ? changeStringGroup : changeStringAccount}
                      readOnly={!isAdmin}
                    />
                  </Col>
                </Row>
              </Fragment>
              ) : (null) }
              {isPersonal
              ?
                (<Button theme="accent" onClick={updateAccount}>{isLoading ? <ButtonLoader/> :'Update Profile'}</Button>)
              :
                (<Button theme="accent" disabled={!isAdmin} onClick={updateGroup}>{isLoading ? <ButtonLoader/> : 'Update Company'}</Button>)
              }
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
  changeStringGroup:PropTypes.func,
  isPersonal:PropTypes.bool,
  isLoading:PropTypes.bool
};

UserAccountDetails.defaultProps = {
  account: {
    name:"Full name",
    title: "Company Name"
  }
};

export default UserAccountDetails;
