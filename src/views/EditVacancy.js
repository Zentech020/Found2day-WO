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
} from "shards-react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import TooltipHelper from "../components/tooltip/tooltip";
import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import ButtonLoader from '../components/Animations/ButtonLoader';
import {
  getSingleVacancy,
  updateVacancy,
  getSpecs,
  changeSpecs
} from "../actions";

import PageTitle from "../components/common/PageTitle";

class editVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false,
      newContent: "",
      showingError: true,
      newSingleVacancy: [],
      filteredJobTitles:[],
      houseNumber:''
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const { getSpecs, getSingleVacancy } = this.props;
    await getSingleVacancy(id);
    getSpecs();

    const { displayContent } = this.props.single_vacancy;

    if (this.props.single_vacancy) {
      this.setState({
        newSingleVacancy: this.props.single_vacancy,
        newContent: displayContent
      });
    }
  };

  async componentDidUpdate(nextProps, history) {
    if (!this.props.error && !this.state.showingError) {
      if (this.props.message) {
        toast.success(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({ showingError: true });
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

  onUpdateVacancy = async id => {
    const { newSingleVacancy, newContent } = this.state;
    if (newSingleVacancy || newContent) {
      await this.props.updateVacancy(id, newSingleVacancy, newContent, true);
      await this.setState({ showingError: false });
    }
  };

  toggle = () => {
    this.setState({
      preview: !this.state.preview
    });
  };


  onUploadImage = async e => {
    try {
      var reader = new FileReader();
      let newState = Object.assign({}, this.state);

      // 5MB Max file size
      if (e.target.files[0].size > 5242880) {
        toast.error('The uploaded file exceeds the size limit of 5MB. Please upload a smaller file.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        await this.setState({ showingError: true });
        return
      }

      reader.onloadend = () => {
        newState.newSingleVacancy["image"] = reader.result;
        this.setState(newState);
      };

      reader.readAsDataURL(e.target.files[0]);
    } catch (err) {
      return
    }
  };

  onChangeBranch = (e) => {
    let newState = Object.assign({}, this.state);
    newState.newSingleVacancy['branch'] = e.target.value
    this.setState(newState);
    this.setState({filteredJobTitles: this.props.jobTitles.filter(el => String(el.branchId) === String(e.target[e.target.selectedIndex].getAttribute('data-id')))})
  }

  onChangeField = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    let newState = Object.assign({}, this.state);
    newState.newSingleVacancy[name] = value;
    this.setState(newState);
  };

  render() {
    const { id } = this.props.match.params;
    const {isLoading} = this.props;
    console.log(isLoading, 'loading stage');
    const { newContent, newSingleVacancy } = this.state;

    const BranchList = ({ array }) => {
      if (array) {
        return array.map(item => (
          <option key={item.id} data-id={item.id} value={item.name}>
            {item.name}
          </option>
        ));
      }
    };

    const SpecsList = ({ array }) => {
      if (array) {
        return array.map(item => (
          <option name={item.name} key={item.id} value={item.name}>
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
                                value={newSingleVacancy.title}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>

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
                                value={newSingleVacancy.description}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>

                            {/* Description */}
                            <Col md="12" className="form-group">
                              <div className="d-flex">
                                <label htmlFor="feDescription">Job description</label>
                                <TooltipHelper
                                  className="ml-2"
                                  tooltipTarget="content"
                                  content="Add a more specific description to outline the tasks, responsibilities and conditions of the job"
                                />
                              </div>
                              <ReactQuill
                                value={newContent}
                                defaultValue={newSingleVacancy.displayContent}
                                onChange={value =>
                                  this.setState({ newContent: value })
                                }
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
                                type="number"
                                min="1"
                                value={newSingleVacancy.maxApplicants}
                                onChange={e => this.onChangeField(e)}
                              />
                            </Col>
                            <Col md="12">
                              <label className="edit-user-details__change-background">

                                Change vacancy image
                                <FormInput
                                  name="image"
                                  className="d-none"
                                  type="file"
                                  onChange={e => this.onUploadImage(e)}
                                />
                                 <i className="material-icons ml-2">&#xE439;</i>
                                 <span class="btn btn-primary ml-2">Upload image... (max. 5 MB)</span>
                              </label>
                            </Col>
                            <Col>
                              {newSingleVacancy.image ? (
                                <div style={{height:'100px', width: '100px',backgroundSize:'cover', backgroundPosition:'center', backgroundImage: `url(${newSingleVacancy.image})`}} ></div>
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
                                <label htmlFor="feDescription">
                                  Alle vakgebieden
                                </label>
                              </div>
                              <FormSelect
                                onChange={e => this.onChangeBranch(e)}
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
                                <option value={newSingleVacancy.education}>
                                  {newSingleVacancy.education}
                                </option>
                                {this.props.specs.education ? (
                                  <SpecsList
                                    array={this.props.specs.education}
                                  />
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
                                <option value={newSingleVacancy.experience}>
                                  {newSingleVacancy.experience}
                                </option>
                                {this.props.specs.experience ? (
                                  <SpecsList
                                    array={this.props.specs.experience}
                                  />
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
                                <option value={newSingleVacancy.employmentType}>
                                  {newSingleVacancy.employmentType}
                                </option>
                                {this.props.specs.employmentType ? (
                                  <SpecsList
                                    array={this.props.specs.employmentType}
                                  />
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
                                <option value={newSingleVacancy.weekHours}>
                                  {newSingleVacancy.weekHours}
                                </option>
                                {this.props.specs.weekHours ? (
                                  <SpecsList
                                    array={this.props.specs.weekHours}
                                  />
                                ) : null}
                              </FormSelect>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="border-top">
                  <div className="d-flex justify-content-end">
                    {!(newSingleVacancy.title &&
                      newSingleVacancy.image &&
                      newSingleVacancy.postalCode &&
                      newSingleVacancy.houseNumber &&
                      newSingleVacancy.employmentType &&
                      newSingleVacancy.experience &&
                      newSingleVacancy.weekHours &&
                      newSingleVacancy.education &&
                      newSingleVacancy.jobTitle &&
                      newSingleVacancy.branch)
                      && <span class="">Please fill out all fields, including the vacancy image, to update the vacancy.</span> }

                    <Button
                      size="sm"
                      theme="accent"
                      className="ml-3 mr-3"
                      disabled={
                        (newSingleVacancy.title &&
                          newSingleVacancy.image &&
                          newSingleVacancy.employmentType &&
                          newSingleVacancy.experience &&
                          newSingleVacancy.weekHours &&
                          newSingleVacancy.education &&
                          newSingleVacancy.jobTitle &&
                          newSingleVacancy.branch)
                          ? false : true
                      }
                      onClick={() => this.onUpdateVacancy(id)}
                    >
                      {isLoading ? <ButtonLoader/> : 'Update'}

                    </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
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
    message: state.vacancies.message,
    busy: state.vacancies.busy,
    jobTitles:state.Specs.specs.jobTitle,
    isLoading: state.vacancies.isLoading
  };
}

export default connect(
  mapStateToProps,
  { getSingleVacancy, updateVacancy, getSpecs, changeSpecs }
)(editVacancy);
