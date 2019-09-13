import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
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
  Modal,
} from "shards-react";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import TooltipHelper from "../components/tooltip/tooltip";
import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import PreviewVacancy from "../components/add-vacancy/PreviewVacancy";
import PageTitle from "../components/common/PageTitle";
import ButtonLoader from '../components/Animations/ButtonLoader';


import {
  addVacancyAction,
  getSpecs,
  changeSpecs,
  getCoordinates
} from "../actions";


class addVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleTooltip: false,
      preview: false,
      title: "",
      description: "",
      content: "",
      maxApplicants: 0,
      image: "",
      jobTitle: "Select Option",
      branch: "Select Option",
      education: "Select Option",
      employmentType: "Select Option",
      experience: "Select Option",
      weekHours: "Select Option",
      distance: "20",
      postalCode: '',
      author: '',
      groupId: '',
      showingError: true,
      branchId: '',
      newSingleVacancy: {
        title: '',
        description: '',
        content: '',
        maxApplicants: 0,
        image: '',
        icon:'',
        jobTitle: "Select Option",
        branch: "Select Option",
        education: "Select Option",
        employmentType: "Select Option",
        experience: "Select Option",
        weekHours: "Select Option",
        postalCode:'',
        houseNumber:null,
      },
      filteredJobTitles:[]
    };
  }

  componentDidMount = async () => {
    const account = JSON.parse(sessionStorage.getItem("account"));
    const group = JSON.parse(sessionStorage.getItem("group"));
    this.setState({
      author: account._id,
      groupId: group._id
    });
    await this.props.getSpecs();
    // await this.props.getCoordinates();
  };

  async componentDidUpdate(nextProps, history) {
    if (!this.props.error && !this.state.showingError) {
      if (this.props.message) {
        toast.success(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });

        await this.setState({ showingError: true });
        // await history.push("/vacancies");
      }
    }
    if (this.props.error && !this.state.showingError) {
      if (this.props.message) {
        toast.error(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({ showingError: true });
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
    const { newSingleVacancy, groupId, author, content} = this.state;
    const { icon} = JSON.parse(sessionStorage.getItem('group'));
    const {location} = this.props;
    // if(newSingleVacancy.postalCode && newSingleVacancy.houseNumber) {
    //   await this.props.getCoordinates(newSingleVacancy.postalCode, newSingleVacancy.houseNumber);
    // }
    if (newSingleVacancy && groupId && location) {
      this.props.addVacancyAction(newSingleVacancy, author, groupId, content, location, icon);
      await this.setState({ showingError: false });
    }
  };

  onUploadImage = e => {
    let newState = Object.assign({}, this.state);
    var reader = new FileReader();
    reader.onloadend = () => {
      newState.newSingleVacancy["image"] = reader.result;
      this.setState(newState);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleSlide = e => {
    this.setState({
      distance: parseInt(e[0])
    });
  };

  onChangeBranch = (e) => {
    let newState = Object.assign({}, this.state);
    var index = e.nativeEvent.target.selectedIndex;
    const brachTitle = e.nativeEvent.target[index].text;
    newState.newSingleVacancy['branch'] = brachTitle
    this.setState(newState);
    this.setState({filteredJobTitles: this.props.jobTitles.filter(el => String(el.branchId) === String(e.target.value))})
  }

  onChangeField = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    let newState = Object.assign({}, this.state);
    newState.newSingleVacancy[name] = value;
    this.setState(newState);
  };

  changeContent = (value) => {
    this.setState({
      content:value
    })
  }

  render() {
    const {
      branch,
      education,
      experience,
      employmentType,
      weekHours
    } = this.props.specs;
    const {isLoading} = this.props;

    const BranchList = ({ array }) => {
      if (array) {
        return array.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ));
      }
    };

    const SpecsList = ({ array }) => {
      if (array) {
        return array.map(item => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ));
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
                                  content="Add a clear title for your vacancy"
                                />
                              </div>
                              <FormInput
                                id="firstName"
                                name="title"
                                value={this.state.newSingleVacancy.title}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>

                            {/* Content */}
                            <Col md="12" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">
                                  Preheader text
                                </label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="description"
                                  content="Add a preheader text of the vacancy which will be shown beneath the title"
                                />
                              </div>
                              <FormTextarea
                                id="firstName"
                                name="description"
                                value={this.state.newSingleVacancy.description}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>

                            {/* Content */}
                            <Col md="12" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">
                                  Job description
                                </label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="content"
                                  content="Add a more specific description to outline the tasks, responsibilities and conditions of the job"
                                />
                              </div>
                              <ReactQuill
                                value={this.state.content}
                                onChange={value => this.changeContent(value)}
                              />
                            </Col>

                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">
                                  Max applicants
                                </label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="maxApplicants"
                                  content="Select the maximum number of applicants. When the maximum is reached, the vacancy will close automatically"
                                />
                              </div>
                              <FormInput
                                id="maxApplicants"
                                name="maxApplicants"
                                value={
                                  this.state.newSingleVacancy.maxApplicants
                                }
                                type="number"
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>

                            <Col md="12">
                              <label className="edit-user-details__change-background">
                                Add vacancy image
                                <input
                                  className="d-none"
                                  type="file"
                                  onChange={e => this.onUploadImage(e)}
                                />
                                 <i className="material-icons ml-2">&#xE439;</i>
                              </label>
                            </Col>
                            <Col>
                              {this.state.newSingleVacancy.image ? (
                                    <div style={{height:'100px', width: '100px',backgroundSize:'cover', backgroundPosition:'center', backgroundImage: `url(${this.state.newSingleVacancy.image})` }} ></div>
                              ) : null}
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <hr />
                      <FormSectionTitle
                        title="Specifications"
                        description="Didn’t find the right specification? Fill in this form and we’ll get in touch very soon."
                        linkText="here"
                        linkUrl="https://accountfound2day.typeform.com/to/AxQ0Rm"
                      />

                      <Row form className="mx-4">
                        <Col lg="8">
                          <Row form>
                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">Branches</label>
                              </div>
                              <FormSelect
                                onChange={e => this.onChangeBranch(e)}
                              >
                                <option>{this.state.newSingleVacancy.branch}</option>
                                {branch ? <BranchList array={branch} /> : null}
                              </FormSelect>
                            </Col>

                            <Col md="6" className="form-group">
                              <label htmlFor="displayEmail">Functietitel</label>
                              <FormSelect
                                name="jobTitle"
                                onChange={(e) => this.onChangeField(e)}
                              >
                                <option value={this.state.newSingleVacancy.jobTitle} >{this.state.newSingleVacancy.jobTitle}</option>
                                {this.state.filteredJobTitles ? (
                                  <SpecsList
                                    array={this.state.filteredJobTitles}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">Opleiding</label>
                              </div>
                              <FormSelect
                                name="education"
                                onChange={e => this.onChangeField(e)}
                              >
                                <option>{this.state.newSingleVacancy.education}</option>
                                {education ? (
                                  <SpecsList array={education} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">
                                  Werkervaring
                                </label>
                              </div>
                              <FormSelect
                                name="experience"
                                onChange={e => this.onChangeField(e)}
                              >
                                <option>{this.state.newSingleVacancy.experience}</option>
                                {experience ? (
                                  <SpecsList array={experience} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">
                                  Dienstverbanden
                                </label>
                              </div>
                              <FormSelect
                                name="employmentType"
                                onChange={e => this.onChangeField(e)}
                              >
                                <option>{this.state.newSingleVacancy.employmentType}</option>
                                {employmentType ? (
                                  <SpecsList array={employmentType} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">Werkweek</label>
                              </div>
                              <FormSelect
                                name="weekHours"
                                onChange={e => this.onChangeField(e)}
                              >
                                <option>{this.state.newSingleVacancy.weekHours}</option>
                                {weekHours ? (
                                  <SpecsList array={weekHours} />
                                ) : null}
                              </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">Postcode</label>
                              </div>
                              <FormInput
                                id="firstName"
                                name="postalCode"
                                value={this.state.newSingleVacancy.postalCode}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>

                            <Col md="6" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">House number</label>
                              </div>
                              <FormInput
                                id="firstName"
                                name="houseNumber"
                                value={this.state.newSingleVacancy.houseNumber}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="border-top">
                    <div className="d-flex justify-content-end">
                      {" "}
                      <Button
                        size="sm"
                        theme="accent"
                        outline
                        disabled={
                          this.state.newSingleVacancy.title && this.state.newSingleVacancy.image ? false : true
                        }
                        className="d-table mr-3"
                        onClick={() => this.setState({ preview: true })}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        theme="accent"
                        className="d-table mr-3"
                        disabled={
                          this.state.newSingleVacancy.postalCode && this.state.newSingleVacancy.houseNumber ? false : true
                        }
                        onClick={() => this.onSubmitVacancy()}
                      >
                       {isLoading ? <ButtonLoader/> : 'Submit'}
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
              title={this.state.newSingleVacancy.title}
              description={this.state.newSingleVacancy.description}
              image={this.state.newSingleVacancy.image}
              icon={JSON.parse(sessionStorage.getItem("group")).icon}
              company={JSON.parse(sessionStorage.getItem("group")).title}
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
    message: state.vacancies.message,
    busy: state.vacancies.busy,
    jobTitles:state.Specs.specs.jobTitle,
    location:state.vacancies.location,
    isLoading:state.vacancies.isLoading
  };
}

export default connect(
  mapStateToProps,
  { addVacancyAction, getSpecs, changeSpecs, getCoordinates }
)(addVacancy);
