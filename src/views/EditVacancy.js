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
      newTitle: '',
      newDescription: '',
      newContent:'',
      newJobTitle: '',
      newBranch: '',
      newEducation: '',
      newEmploymentType: '',
      newExperience: '',
      newWeekHours: '',
      newDistance: '',
      newPostalCode: '',
      newImage:'',
      showingError: true
    };
  }

  componentDidMount = async() => {
    const { id } = this.props.match.params;
    const { getSpecs, getSingleVacancy } = this.props;
    await getSingleVacancy(id);
    getSpecs();

    const {
      title,
      description,
      content,
      jobTitle,
      branch,
      experience,
      education,
      weekHours,
      distance,
      postalcode,
      employmentType,
      image
    } = this.props.single_vacancy;

    if (this.props.single_vacancy) {
      this.setState({
        newTitle: title,
        newDescription: description,
        newContent:content,
        newJobTitle: jobTitle,
        newBranch: branch,
        newEducation: education,
        newEmploymentType: employmentType,
        newExperience: experience,
        newWeekHours: weekHours,
        newDistance: distance,
        newPostalCode: postalcode,
        newImage:image
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
    const {
      newTitle,
      newDescription,
      newContent,
      newImage,
      newJobTitle,
      newBranch,
      newEducation,
      newEmploymentType,
      newExperience,
      newWeekHours,
      newDistance,
      newPostalCode
    } = this.state;
    if (
      newTitle ||
      newDescription ||
      newContent ||
      newImage ||
      newJobTitle ||
      newBranch ||
      newEducation ||
      newEmploymentType ||
      newExperience ||
      newWeekHours ||
      newDistance ||
      newPostalCode
    ) {
      this.props.updateVacancy(
        id,
        newTitle,
        newDescription,
        newContent,
        newImage,
        newJobTitle,
        newBranch,
        newEducation,
        newEmploymentType,
        newExperience,
        newWeekHours,
        newDistance,
        newPostalCode
      ).then((res)=>{
        // this.props.history.push(`/vacancy/${id}`);
      });
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
    reader.onloadend = () => {
      this.setState({
        newImage: reader.result
      })
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  onChangeBranch = (e) => {
    this.setState({newBranch: e.target.value})
    var index = e.nativeEvent.target.selectedIndex;
    this.props.changeSpecs(e.target[e.target.selectedIndex].getAttribute('data-id'));
  }

  render() {
    const { id } = this.props.match.params;

    const {
      newTitle,
      newDescription,
      newContent,
      newJobTitle,
      newBranch,
      newEducation,
      newExperience,
      newEmploymentType,
      newWeekHours,
      newPostalCode,
      newImage
    } = this.state;

    const BranchList = ({ array }) => {
      if (array) {
        return array.map(item => <option key={item.id} data-id={item.id} value={item.name}>{item.name}</option>);
      }
    };

    const SpecsList = ({ array }) => {
      if (array) {
        return array.map(item => <option key={item.id} value={item.name}>{item.name}</option>);
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
                                value={newTitle}
                                onChange={e => {
                                  this.setState({ newTitle: e.target.value });
                                }}
                              />
                            </Col>

                            <Col md="12" className="form-group">
                              <label htmlFor="feDescription">Description</label>
                              <FormTextarea
                                id="firstName"
                                value={newDescription}
                                onChange={e =>
                                  this.setState({ newDescription: e.target.value })
                                }
                              />
                            </Col>

                            {/* Description */}
                            <Col md="12" className="form-group">
                              <label htmlFor="feDescription">Content</label>
                              <ReactQuill
                                value={newContent}
                                onChange={value =>
                                  this.setState({ newContent: value })
                                }
                              />
                            </Col>
                            <Col md="12">
                              <label className="edit-user-details__change-background">
                                <i className="material-icons mr-1">&#xE439;</i>
                                Change Background Photo
                                <FormInput className="d-none" type="file" onChange={(e) => this.onUploadImage(e)}/>
                              </label>
                              <br/>
                              <img src={newImage} height={100} width={100}/>
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
                                <option>{newBranch}</option>
                                {this.props.specs.branch ? (
                                  <BranchList array={this.props.specs.branch} />
                                ) : null}
                              </FormSelect>
                            </Col>

                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Functietitel</label>
                              <FormSelect
                                onChange={e =>
                                  this.setState({
                                    newJobTitle: e.target.value
                                  })
                                }
                              >
                                <option value={newJobTitle} >{newJobTitle}</option>
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
                                onChange={e =>
                                  this.setState({
                                    newEducation: e.target.value
                                  })
                                }
                              >
                                <option value={newEducation}>{newEducation}</option>
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
                                onChange={e =>
                                  this.setState({
                                    newExperience: e.target.value
                                  })
                                }
                              >
                                <option value={newExperience}>{newExperience}</option>
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
                                onChange={e =>
                                  this.setState({
                                    newEmploymentType: e.target.value
                                  })
                                }
                              >
                                <option value={newEmploymentType}>{newEmploymentType}</option>
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
                                onChange={e =>
                                  this.setState({
                                    newWeekHours: e.target.value
                                  })
                                }
                              >
                                <option value={newWeekHours}>{newWeekHours}</option>
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
                                value={newPostalCode}
                                onChange={e => {
                                  this.setState({
                                    newPostalCode: e.target.value
                                  });
                                }}
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
