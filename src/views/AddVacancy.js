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
import TooltipHelper from '../components/tooltip/tooltip';
import FormSectionTitle from '../components/edit-user-profile/FormSectionTitle';
import GeneralInformation from '../components/add-vacancy/GeneralInformation';
import PreviewVacancy from '../components/add-vacancy/PreviewVacancy';

import { addVacancyAction, getSpecs, changeSpecs, getCoordinates } from '../actions';
import PageTitle from '../components/common/PageTitle';

import colors from '../utils/colors';

class addVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleTooltip:false,
      preview: false,
      title: '',
      description: '',
      content:'',
      maxApplicants:0,
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
    await this.props.getCoordinates();
  };

  async componentDidUpdate(nextProps, history) {
    if (!this.props.error && !this.state.showingError) {
      if(this.props.message) {
        toast.success(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });

        await this.setState({showingError: true})
        await history.push('/vacancies');
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
      maxApplicants,
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
        maxApplicants,
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
                              <div className="d-flex">
                                <label htmlFor="firstName">Title</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="title"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."
                                  // open={this.state.toggleTooltip}
                                  // toggle={() => this.setState({toggleTooltip: !this.state.toggleTooltip})}
                                />
                              </div>
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
                              <div className="d-flex">
                                <label htmlFor="feDescription">Description</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="description"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Content</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="content"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
                              {/* <FormTextarea id="feDescription" rows="5" /> */}
                              <ReactQuill
                                value={this.state.content}
                                onChange={value =>
                                  this.setState({ content: value })
                                }
                              />
                            </Col>

                            <Col md="6" className="form-group">
                            <div className="d-flex">
                                <label htmlFor="feDescription">Max applicants</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="maxApplicants"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
                              <FormInput
                                id="maxApplicants"
                                type="number"
                                onChange={e =>
                                  this.setState({ maxApplicants: e.target.value })
                                }
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Alle vakgebieden</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="vakgebieden"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Functietitel</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="Functietitel"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Opleiding</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="Opleiding"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Werkervaring</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="Werkervaring"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Dienstverbanden</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="Dienstverbanden"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Werkweek</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="Werkweek"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
                            <div className="d-flex">
                                <label htmlFor="feDescription">Postcode</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="Postcode"
                                  content="Praesent congue erat at massa. Cras dapibus. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi."                                  />
                                </div>
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
            className="c-modal"
          >
            <PreviewVacancy
              // image={this.state.image}
              title={this.state.title}
              description={this.state.description}
              image={this.state.image}
              icon={(JSON.parse(sessionStorage.getItem('group')).icon)}
              company={(JSON.parse(sessionStorage.getItem('group')).title)}
            />
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
  { addVacancyAction, getSpecs , changeSpecs, getCoordinates}
)(addVacancy);
