import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import FuzzySearch from 'fuzzy-search';
import dateFormat from 'dateformat';
import DeviationModal from '../components/applicants/deviationModal';
import TooltipHelper from "./../components/tooltip/tooltip";

import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  FormCheckbox,
  CardFooter,
  Modal,
  ModalBody,
  ModalHeader
} from 'shards-react';
import { connect } from 'react-redux';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import PageTitle from '../components/common/PageTitle';
import SingleHeader from '../components/single-vacancy/singleHeader';
import BlockAnimation from '../components/Animations/Block';
import 'react-tabs/style/react-tabs.css';
import getApplicantsData from '../data/applicants-list';
import { getSingleVacancy, getApplicantCV, deleteSingleVacancy, getApplicationsByVacancy , updateVacancy, getDeviation} from '../actions';
import colors from '../utils/colors';
import amplitude from 'amplitude-js';
var employerAnalytics = amplitude.getInstance();

class SingleVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      tableData: [],
      modal: false,
      modalInfo: null,
      vacancySwitcher: true,
      showingError: true,
      toggleTooltip:false,
      applications:[],
      singleVacancy:[],
      openDeviationModal:false,
    };

    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemViewDetails = this.handleItemViewDetails.bind(this);
    this.handleDirectoryClick = this.handleDirectoryClick.bind(this);
  }

  componentDidMount = async() => {
    const { id } = this.props.match.params;
    console.log(id);
    await this.props.getSingleVacancy(id);
    await this.props.getApplicationsByVacancy(id);

    this.setState({
      applications:this.props.applications,
      single_vacancy:this.props.single_vacancy
    });

    this.searcher = new FuzzySearch(this.state.applications, ['name', 'vacancyTitle'], {
      caseSensitive: false
    });
    console.log(this.searcher);
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

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  getStatusClass(status) {
    const statusMap = {
      Cancelled: 'danger',
      Complete: 'success',
      Pending: 'warning'
    };

    return `text-${statusMap[status]}`;
  }

  /**
   * Handles the page size change event.
   */
  handlePageSizeChange(e) {
    this.setState({
      ...this.state,
      pageSize: e.target.value
    });
  }

  /**
   * Handles the global search.
   */
  handleFilterSearch(e) {
    this.setState({
      ...this.state,
      applications: this.searcher.search(e.target.value)
    });
  }

  /**
   * Mock method for editing transactions.
   */
  handleItemEdit(row) {
    alert(`Editing transaction "${row.original.id}"!`);
  }

  /**
   * Mock method for deleting transactions.
   */
  handleItemDelete(row) {
    alert(`Deleting transaction "${row.original.id}"!`);
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemConfirm(row) {
    alert(`Confirming transaction "${row.original.id}"!`);
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemViewDetails(row) {
    alert(`Viewing details for "${row.original.id}"!`);
  }

  handleDirectoryClick(dir) {
    const newState = { ...this.state };
    this.setState({
      ...(newState.directories[newState.directories.indexOf(dir)] = {
        ...dir,
        selected: !dir.selected
      })
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  linkToEdit = id => {
    this.props.history.push(`/edit-vacancy/${id}`);
    employerAnalytics.logEvent('editVacancy', {page:'singleVacancy'})
  };

  onDeleteVacancy = async(id) => {
    this.props.deleteSingleVacancy(id).then((res) => {
      this.props.history.push('/vacancies')
    });
    await this.setState({showingError: false})
  };

  onChangeVisibillity = async() => {
    const { id } = this.props.match.params;
    let newState = Object.assign({}, this.state);
    employerAnalytics.logEvent('switchVisibillity' , {page:'singleVacancy',status: newState.single_vacancy['visible'] })
    newState.single_vacancy['visible'] = !this.state.single_vacancy.visible;
    this.setState(newState);
    await this.props.updateVacancy(id, this.state.single_vacancy);
  }

  onSetDeviations = async(row) => {
    console.log(row);
    await this.props.getDeviation(row.original.vacancyId);
    this.setState({
      openDeviationModal:true,
      modal:true,
      userInfo:row.original
    })
  }

  onGetCV = () => {
    this.props.getApplicantCV().then((res) => {
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    const { directories, applications } = this.state;
    const { pageSize, pageSizeOptions , single_vacancy} = this.state;
    const {
      title,
      description,
      image,
      jobTitle,
      branch,
      experience,
      employmentType,
      education,
      weekHours,
      postalcode
    } = this.props.single_vacancy;
    const { id } = this.props.match.params;
    const {isLoading} = this.props;
    const tableColumns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 60,
        className: 'text-center'
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'text-center',
        minWidth: 200,
      },
      {
        Header: 'Date',
        accessor: 'date',
        className: 'text-center',
        minWidth: 80,
        Cell: row =>
        dateFormat(new Date(row.original.createdAt), 'dd-mm-yyyy')
      },
      {
        Header: 'Vacancy',
        accessor: 'vacancyTitle',
        maxWidth: 200,
        className: 'text-center'
      },
      {
        Header: 'CV',
        accessor: 'cv',
        maxWidth: 75,
        className: 'text-center',
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <div onClick={() => this.onGetCV()}>
              <i className="material-icons">&#xE870;</i>
            </div>
          </ButtonGroup>
        )
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        maxWidth: 300,
        minWidth: 180,
        sortable: false,
        Cell: row => (
          <div className="d-table mx-auto">
            <a className="btn btn-primary" href={`tel:${row.original.phone}`}><i className="material-icons">phone</i></a>
            <a className="btn btn-primary ml-2" href={`mailto:${row.original.email}`}><i className="material-icons">email</i></a>
            <Button className="ml-2" onClick={() => this.onSetDeviations(row)}>More</Button>
          </div>
        )
      }
    ];


    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="pt-4">
          <Col md={6}>
            {isLoading ? ( <BlockAnimation height={300} width={600}/>) : (<SingleHeader backgroundImg={image} />) }
          </Col>
        </Row>

        <Row noGutters className="page-header py-4 align-items-start">
          {/* Page Header :: Title */}
          <PageTitle
            title={title}
            subtitle="Overview"
            htmlDecription={description}
            className="text-sm-left mb-3 align-items-center"
          />
          <Col sm="6" className="d-flex flex-column align-items-end">
          <TooltipHelper
            className="ml-auto my-auto"
            content="When the switch is turned on, the vacancy is active and there can be applied on. Turn the switch off and the vacancy won’t be enabled."
            tooltipTarget="hideorshow"
          />
            <FormCheckbox
              toggle
              checked={single_vacancy.visible}
              className="ml-auto my-auto"
              id="conversationsEmailsToggle"
              onChange={() => this.onChangeVisibillity()}
            />
          </Col>
        </Row>
        <Row noGutters>
          <Col md={12} className="mt-4">
            <Tabs>
              <TabList className="c-tab d-flex align-items-center">
                <Tab
                  className="c-tabs mx-4"
                  selectedClassName="c-tabs--selected"
                  onClick={() => employerAnalytics.logEvent('viewSpecs', {page:'singleVacancy'})}
                >
                  Specs
                </Tab>
                <Tab
                  className="c-tabs mx-4"
                  selectedClassName="c-tabs--selected"
                  onClick={() => employerAnalytics.logEvent('viewApplicants', {page:'singleVacancy'})}
                >
                  Applicants
                </Tab>
              </TabList>

              <TabPanel>
                <div className="file-manager file-manager-cards">
                  <Row>
                    <Col lg="3" key={1}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">pie_chart</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {branch}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={2}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">pie_chart</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">{jobTitle}</h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={3}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">school</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {education}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={4}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">format_list_bulleted</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {experience}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={5}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">description</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {employmentType}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={6}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">calendar_today</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {weekHours}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={8}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">place</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {postalcode}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPanel>
              <TabPanel>
                <Card className="p-0 mb-4">
                  <CardHeader className="p-0">
                    <Container
                      fluid
                      className="file-manager__filters border-bottom"
                    >
                      <Row>
                        {/* Filters :: Page Size */}
                        <Col
                          className="file-manager__filters__rows d-flex"
                          md="6"
                        >
                          <span>Show</span>
                          <FormSelect
                            size="sm"
                            value={this.state.pageSize}
                            onChange={this.handlePageSizeChange}
                          >
                            {pageSizeOptions.map((size, idx) => (
                              <option key={idx} value={size}>
                                {size} rows
                              </option>
                            ))}
                          </FormSelect>
                        </Col>

                        {/* Filters :: Search */}
                        <Col
                          className="file-manager__filters__search d-flex"
                          md="6"
                        >
                          <InputGroup seamless size="sm" className="ml-auto">
                            <InputGroupAddon type="prepend">
                              <InputGroupText>
                                <i className="material-icons">search</i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <FormInput onChange={this.handleFilterSearch} />
                          </InputGroup>
                        </Col>
                      </Row>
                    </Container>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="">
                    <ReactTable
                      columns={tableColumns}
                      data={applications}
                      pageSize={pageSize}
                      showPageSizeOptions={false}
                      resizable={true}
                    />
                    </div>
                  </CardBody>
                </Card>
              </TabPanel>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="d-flex justify-content-end">
            <Button onClick={() => this.linkToEdit(id)}>Edit</Button>
            <Button
              className="ml-4"
              theme="danger"
              onClick={() => this.onDeleteVacancy(id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
        {this.state.openDeviationModal ? (
          <Modal
          open={this.state.modal}
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
              <h2 className="mt-2">{this.state.userInfo.name}</h2>
              <p className="text-center mt-2">
                Discovered had get considered projection who favourable.
                Necessary up knowledge it tolerably. Unwilling departure
                education to admitted speaking...
              </p>
            </div>
            <hr />
            <Row>
              <Col md={12}>
                <p className="mb-2">User action</p>
              </Col>
              <Col md={6}>
                <div className="flex flex-column">
                  <h5 className="my-2">Email</h5>
                  <p className="my-0">{this.state.userInfo.email}</p>
                </div>
              </Col>

              <Col md={6}>
                <div className="flex flex-column">
                  <h5 className="my-2">Address</h5>
                  <p className="my-0">Helmholtzstraat 18b</p>
                </div>
              </Col>

              <Col md={6}>
                <div className="flex flex-column">
                  <h5 className="my-2">Phone</h5>
                  <p className="my-0">{this.state.userInfo.phone}</p>
                </div>
              </Col>

              <Col md={6}>
                <div className="flex flex-column">
                  <h5 className="my-2">CV</h5>
                  <i className="material-icons">insert_drive_file</i>
                </div>
              </Col>
            </Row>
            <hr />
            <Row className="mt-4">
              <Col md={12}>
                <p className="mb-2">Deviations</p>
              </Col>
              <DeviationModal deviations={this.props.deviations}/>
            </Row>
          </ModalBody>
        </Modal>
        ) : null}
      </Container>
    );
  }
}

SingleVacancy.defaultProps = {
  directories: [
    {
      id: 1,
      title: 'ICT/Development',
      selected: false
    },
    {
      id: 2,
      title: 'PHP developer',
      selected: false
    },
    {
      id: 3,
      title: 'HBO/bachelor',
      selected: false
    },
    {
      id: 4,
      title: '1-3 jaar',
      selected: false
    },
    {
      id: 5,
      title: 'Bij werkgever',
      selected: false
    },
    {
      id: 6,
      title: '32-40 uur',
      selected: false
    },
    {
      id: 7,
      title: '1098LJ',
      selected: false
    },
    {
      id: 8,
      title: '20KM',
      selected: false
    }
  ]
};

//Connect redux
function mapStateToProps(state) {
  return {
    single_vacancy: state.vacancies.single_vacancy,
    error: state.vacancies.err,
    message:state.vacancies.message,
    busy:state.vacancies.busy,
    applications: state.applicants.applications,
    isLoading: state.vacancies.isLoading,
    deviations: state.applicants.deviations,
  };
}

export default connect(
  mapStateToProps,
  { getSingleVacancy, deleteSingleVacancy, getApplicationsByVacancy, updateVacancy, getDeviation, getApplicantCV }
)(SingleVacancy);
