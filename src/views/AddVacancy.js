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
  ModalHeader,
  Slider
} from 'shards-react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import FormSectionTitle from '../components/edit-user-profile/FormSectionTitle';
import GeneralInformation from '../components/add-vacancy/GeneralInformation';

import { addVacancyAction, getSpecs, changeSpecs } from '../actions';
import PageTitle from '../components/common/PageTitle';

import colors from '../utils/colors';

class addVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false,
      title: '',
      description: '',
      content:'',
      image: '',
      jobTitle: 'Select Option',
      branch: 'Select Option',
      education: 'Select Option',
      employmentType: 'Select Option',
      experience: 'Select Option',
      weekHours: 'Select Option',
      distance: '20',
      postalCode: '',
      author: '',
      groupId: '',
      showingError: true,
      branchId:'',
    };
  }

  componentDidMount = async () => {
    const account = JSON.parse(sessionStorage.getItem('account'));
    const group = JSON.parse(sessionStorage.getItem('group'));
    this.setState({
      author: account._id,
      groupId: group._id
    });
    await this.props.getSpecs();
  };

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


  toggle = () => {
    this.setState({
      preview: !this.state.preview
    });
  };

  handleChange = value => {
    this.setState({ text: value });
  };

  onSubmitVacancy = async () => {
    const {
      title,
      description,
      content,
      image,
      jobTitle,
      branch,
      education,
      employmentType,
      experience,
      weekHours,
      distance,
      postalCode,
      author,
      groupId
    } = this.state;
    if (title && description && content && image && jobTitle && branch && education && employmentType &&
        experience &&
        weekHours &&
        distance &&
        postalCode,
        author,
        groupId) {
      this.props.addVacancyAction(
        title,
        description,
        content,
        image,
        jobTitle,
        branch,
        education,
        employmentType,
        experience,
        weekHours,
        distance,
        postalCode,
        author,
        groupId
      )
      await this.setState({showingError: false})
    }
  };

  onUploadImage = (e)  => {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          image: reader.result
        })
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    handleSlide = (e) => {
      this.setState({
        distance: parseInt(e[0])
      });
    }

    onChangeBranch = (e) => {
      var index = e.nativeEvent.target.selectedIndex;
      const brachTitle = e.nativeEvent.target[index].text;
      console.log(e.target.value)
      this.props.changeSpecs(e.target.value);
      this.setState({branch:brachTitle})
    }

  render() {

    const {jobTitle, branch, education, experience, employmentType, weekHours} = this.props.specs;
    const {image} = this.state;

    const BranchList = ({ array }) => {
      if (array) {
        return array.map(item => <option key={item.id} value={item.id}>{item.name}</option>);
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
            title="Add Vacancy"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <div>
          <Container fluid className="main-content-container px-4">
            <Row>
              <Col lg="10" className="mx-auto mt-4">
                <Card small className="edit-user-details mb-4">

                  <CardBody className="p-0">
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
                                value={this.state.title}
                                onChange={e =>
                                  this.setState({ title: e.target.value })
                                }
                              />
                            </Col>

                          {/* Content */}
                            <Col md="12" className="form-group">
                              <label htmlFor="feDescription">Description</label>
                              {/* <FormTextarea id="feDescription" rows="5" /> */}
                              <FormTextarea
                                id="firstName"
                                value={this.state.description}
                                onChange={e =>
                                  this.setState({ description: e.target.value })
                                }
                              />
                            </Col>

                            {/* Content */}
                            <Col md="12" className="form-group">
                              <label htmlFor="feDescription">Content</label>
                              {/* <FormTextarea id="feDescription" rows="5" /> */}
                              <ReactQuill
                                value={this.state.content}
                                onChange={value =>
                                  this.setState({ content: value })
                                }
                              />
                            </Col>

                            <Col md="6" className="form-group">
                              <label htmlFor="firstName">Max Applicants</label>
                              <FormInput
                                id="maxApplicants"
                                type="number"
                              />
                            </Col>

                            <Col md="12">
                              <label className="edit-user-details__change-background">
                                <i className="material-icons mr-1">&#xE439;</i>
                                Add vacancy image
                                <input className="d-none" type="file" onChange={(e) => this.onUploadImage(e)}/>
                                <br/>
                                {image ? (<img src={image} height={100} width={100} />) : (null)}
                              </label>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <hr />
                      <FormSectionTitle
                        title="Specifications"
                        description="Add your specifications"
                      />
                      <Row form className="mx-4">
                        <Col lg="8">
                          <Row form>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">
                                Alle vakgebieden
                              </label>
                              <FormSelect
                                onChange={e =>
                                  this.onChangeBranch(e)
                                }
                              >
                                <option>{this.state.branch}</option>
                                {branch ? <BranchList array={branch} /> : null}
                              </FormSelect>
                            </Col>

                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Functietitel</label>
                              <FormSelect
                                onChange={e =>
                                  this.setState({ jobTitle: e.target.value })
                                }
                              >
                                <option>{this.state.jobTitle}</option>
                                {jobTitle ? (
                                  <SpecsList array={jobTitle} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Opleiding</label>
                              <FormSelect
                                onChange={e =>
                                  this.setState({ education: e.target.value })
                                }
                              >
                                <option>{this.state.education}</option>
                                {education ? (
                                  <SpecsList array={education} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Werkervaring</label>
                              <FormSelect
                                onChange={e =>
                                  this.setState({ experience: e.target.value })
                                }
                              >
                                <option>{this.state.experience}</option>
                                {experience ? (
                                  <SpecsList array={experience} />
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
                                    employmentType: e.target.value
                                  })
                                }
                              >
                                <option>{this.state.employmentType}</option>
                                {employmentType ? (
                                  <SpecsList array={employmentType} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Werkweek</label>
                              <FormSelect
                                onChange={e =>
                                  this.setState({ weekHours: e.target.value })
                                }
                              >
                                <option>{this.state.weekHours}</option>
                                {weekHours ? (
                                  <SpecsList array={weekHours} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="firstName">Postcode</label>
                              <FormInput
                                id="firstName"
                                value={this.state.postalCode}
                                onChange={e => {
                                  this.setState({ postalCode: e.target.value });
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
                      {' '}
                      <Button
                        size="sm"
                        theme="accent"
                        outline
                        disabled={this.state.title && this.state.image ? (false) : (true)}
                        className="d-table mr-3"
                        onClick={() => this.setState({ preview: true })}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        theme="accent"
                        className="d-table mr-3"
                        onClick={() => this.onSubmitVacancy()}
                      >
                        Submit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {this.state.preview ? (
          <Modal
            open={this.state.preview}
            toggle={() => this.toggle()}
            position="center"
          >
            <ModalHeader
              className="popup__bg"
              style={{
                backgroundImage: this.state.image ? (`url(${this.state.image})`)  :(`url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)`)
              }}
            />
            <ModalBody>
              <div className="popup__basic-info d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-4">{this.state.title ? (this.state.title) : ('title')}</h2>
                <p className="text-center mt-2">
                  Discovered had get considered projection who favourable.
                  Necessary up knowledge it tolerably. Unwilling departure
                  education to admitted speaking...
                </p>
              </div>
              <hr />
            </ModalBody>
          </Modal>
        ) : null}
      </Container>
    );
  }
}

addVacancy.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

//Connect redux
function mapStateToProps(state) {
  return {
    specs: state.Specs.specs,
    error: state.vacancies.err,
    message:state.vacancies.message,
    busy:state.vacancies.busy
  };
}

export default connect(
  mapStateToProps,
  { addVacancyAction, getSpecs , changeSpecs}
)(addVacancy);
