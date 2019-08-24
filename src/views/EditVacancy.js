import React from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
  Progress,
  Modal,
  ModalBody,
  ModalHeader
} from 'shards-react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import FormSectionTitle from '../components/edit-user-profile/FormSectionTitle';
import GeneralInformation from '../components/add-vacancy/GeneralInformation';
import { getSingleVacancy, updateVacancy, getSpecs, changeSpecs } from '../actions';

import PageTitle from '../components/common/PageTitle';

import colors from '../utils/colors';

class editVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false,
      newContent:'',
      showingError: true,
      newSingleVacancy:[],
    };
  }

  componentDidMount = async() => {
    const { id } = this.props.match.params;
    const { getSpecs, getSingleVacancy } = this.props;
    await getSingleVacancy(id);
    getSpecs();

    const {content} = this.props.single_vacancy;

    if (this.props.single_vacancy) {
      this.setState({
        newSingleVacancy:this.props.single_vacancy,
        newContent:content,
      });
    }
  }

  async componentDidUpdate(nextProps, history) {
    if (!this.props.error && !this.state.showingError) {
      if(this.props.message) {
        toast.success(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({showingError: true})
    }
    }
    if(this.props.error && !this.state.showingError) {
      if(this.props.message) {
        toast.error(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({showingError: true})
      }
    }
  }

  onUpdateVacancy = async (id) => {
    const {newSingleVacancy, newContent } = this.state;
    if (newSingleVacancy || newContent) {
      await this.props.updateVacancy(id, newSingleVacancy);
      await this.setState({showingError: false})
    }
  };

  toggle = () => {
    this.setState({
      preview: !this.state.preview
    });
  };

  handleChange = value => {
    this.setState({ text: value });
  };

  onUploadImage = (e)  => {
    var reader = new FileReader();
    let newState = Object.assign({}, this.state);
    reader.onloadend = () => {
      newState.newSingleVacancy['image'] = reader.result
      this.setState(newState);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  onChangeBranch = (e) => {
    let newState = Object.assign({}, this.state);
    newState.newSingleVacancy['branch'] = e.target.value
    this.setState(newState);
    var index = e.nativeEvent.target.selectedIndex;
    this.props.changeSpecs(e.target[e.target.selectedIndex].getAttribute('data-id'));
  }

  onChangeField = (e) => {
    const name = e.target.name
    const value = e.target.value;
    console.log(name, value);
    let newState = Object.assign({}, this.state);
    newState.newSingleVacancy[name] = value
    this.setState(newState);
  }

  render() {
    const { id } = this.props.match.params;

    const {
      newContent,
      newSingleVacancy
    } = this.state;

    const BranchList = ({ array }) => {
      if (array) {
        return array.map(item => <option key={item.id} data-id={item.id} value={item.name}>{item.name}</option>);
      }
    };

    const SpecsList = ({ array }) => {
      if (array) {
        return array.map(item => <option name={item.name} key={item.id} value={item.name}>{item.name}</option>);
      }
    };


    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle
            title="Edit Vacancy"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <div>
          <Container fluid className="main-content-container px-4">
            <Row>
              <Col lg="10" className="mx-auto mt-4">
                <Card small className="edit-user-details mb-4">
                  {/* <ProfileBackgroundPhoto /> */}

                  <CardBody className="p-0">
                    {/* Form Section Title :: General */}
                    <Form className="py-4">
                      <FormSectionTitle
                        title="General"
                        description="Setup your general profile details."
                      />

                      <Row form className="mx-4">
                        <Col lg="12">
                          <Row form>
                            {/* Title */}
                            <Col md="12" className="form-group">
                              <label htmlFor="firstName">Title</label>
                              <FormInput
                                id="firstName"
                                name="title"
                                value={newSingleVacancy.title}
                                onChange={(e) => this.onChangeField(e)}
                              />
                            </Col>

                            <Col md="12" className="form-group">
                              <label htmlFor="feDescription">Description</label>
                              <FormTextarea
                                id="firstName"
                                name="description"
                                value={newSingleVacancy.description}
                                onChange={(e) => this.onChangeField(e)}
                              />
                            </Col>

                            {/* Description */}
                            <Col md="12" className="form-group">
                              <label htmlFor="feDescription">Content</label>
                              <ReactQuill
                                value={newContent}
                                defaultValue={newSingleVacancy.content}
                                onChange={(e) => this.onChangeField(e)}
                                onChange={value =>
                                  this.setState({ newContent: value })
                                }
                              />
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="firstName">Max Applicants</label>
                              <FormInput
                                id="maxApplicants"
                                name="maxApplicants"
                                type="number"
                                value={newSingleVacancy.maxApplicants}
                                onChange={(e) => this.onChangeField(e)}
                              />
                            </Col>
                            <Col md="12">
                              <label className="edit-user-details__change-background">
                                <i className="material-icons mr-1">&#xE439;</i>
                                Change Background Photo
                                <FormInput name="image" className="d-none" type="file" onChange={(e) => this.onUploadImage(e)}/>
                              </label>
                              <br/>
                              <img src={newSingleVacancy.image} alt="Vacancy" height={100} width={100}/>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <hr />
                      <FormSectionTitle
                        title="Specifications"
                        description="Setup your general profile details."
                      />
                      <Row form className="mx-4">
                        <Col lg="8">
                          <Row form>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">
                                Alle vakgebieden
                              </label>
                              <FormSelect
                                onChange={(e) => this.onChangeBranch(e)}
                              >
                                <option>{newSingleVacancy.branch}</option>
                                {this.props.specs.branch ? (
                                  <BranchList array={this.props.specs.branch} />
                                ) : null}
                              </FormSelect>
                            </Col>

                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Functietitel</label>
                              <FormSelect
                                name="jobTitle"
                                onChange={(e) => this.onChangeField(e)}
                              >
                                <option value={newSingleVacancy.jobTitle} >{newSingleVacancy.jobTitle}</option>
                                {this.props.specs.jobTitle ? (
                                  <SpecsList
                                    array={this.props.specs.jobTitle}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Opleiding</label>
                              <FormSelect
                                name="education"
                                onChange={(e) => this.onChangeField(e)}
                              >
                                <option value={newSingleVacancy.education}>{newSingleVacancy.education}</option>
                                {this.props.specs.education ? (
                                  <SpecsList
                                    array={this.props.specs.education}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Werkervaring</label>
                              <FormSelect
                                name="experience"
                                onChange={(e) => this.onChangeField(e)}
                              >
                                <option value={newSingleVacancy.experience}>{newSingleVacancy.experience}</option>
                                {this.props.specs.experience ? (
                                  <SpecsList
                                    array={this.props.specs.experience}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">
                                Dienstverbanden
                              </label>
                              <FormSelect
                                name="employmentType"
                                onChange={(e) => this.onChangeField(e)}
                              >
                                <option value={newSingleVacancy.employmentType}>{newSingleVacancy.employmentType}</option>
                                {this.props.specs.employmentType ? (
                                  <SpecsList
                                    array={this.props.specs.employmentType}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Werkweek</label>
                              <FormSelect
                                name="weekHours"
                                onChange={(e) => this.onChangeField(e)}
                              >
                                <option value={newSingleVacancy.weekHours}>{newSingleVacancy.weekHours}</option>
                                {this.props.specs.weekHours ? (
                                  <SpecsList
                                    array={this.props.specs.weekHours}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="firstName">Postcode</label>
                              <FormInput
                                id="firstName"
                                name="postalcode"
                                value={newSingleVacancy.postalcode}
                                onChange={(e) => this.onChangeField(e)}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="border-top">
                    <div className="d-flex justify-content-end">
                      <Button
                        size="sm"
                        theme="accent"
                        className="d-table mr-3"
                        onClick={() => this.onUpdateVacancy(id)}
                      >
                        Update
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* {this.state.preview ? (
          <Modal
            open={this.state.preview}
            toggle={() => this.toggle()}
            position="center"
          >
            <ModalHeader
              className="popup__bg"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1477948879622-5f16e220fa42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)'
              }}
            />
            <ModalBody>
              <div className="popup__basic-info d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-4">test</h2>
                <p className="text-center mt-2">
                  Discovered had get considered projection who favourable.
                  Necessary up knowledge it tolerably. Unwilling departure
                  education to admitted speaking...
                </p>
              </div>
              <hr />
            </ModalBody>
          </Modal>
        ) : null} */}
      </Container>
    );
  }
}

editVacancy.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

//Connect redux
function mapStateToProps(state) {
  return {
    single_vacancy: state.vacancies.single_vacancy,
    specs: state.Specs.specs,
    error: state.vacancies.err,
    message:state.vacancies.message,
    busy:state.vacancies.busy
  };
}


export default connect(
  mapStateToProps,
  { getSingleVacancy, updateVacancy, getSpecs, changeSpecs }
)(editVacancy);
