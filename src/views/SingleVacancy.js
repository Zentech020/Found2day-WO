import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import FuzzySearch from 'fuzzy-search';
import dateFormat from 'dateformat';

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

import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import PageTitle from '../components/common/PageTitle';
import SingleHeader from '../components/single-vacancy/singleHeader';
import 'react-tabs/style/react-tabs.css';
import getTransactionHistoryData from '../data/transaction-history-data';
import getApplicantsData from '../data/applicants-list';
import { getSingleVacancy, deleteSingleVacancy } from '../actions';

import colors from '../utils/colors';

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
      vacancySwitcher: true
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

  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.getSingleVacancy(id);
  };

  componentWillMount() {
    const tableData = getApplicantsData();

    this.setState({
      ...this.state,
      tableData
    });

    // Initialize the fuzzy searcher.
    this.searcher = new FuzzySearch(tableData, ['customer', 'status'], {
      caseSensitive: false
    });
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
      tableData: this.searcher.search(e.target.value)
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
  };

  onDeleteVacancy = id => {
    this.props.deleteSingleVacancy(id);
  };

  render() {
    const { directories } = this.state;
    const { tableData, pageSize, pageSizeOptions } = this.state;
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
      distance,
      postalcode
    } = this.props.single_vacancy;
    const { id } = this.props.match.params;
    const tableColumns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 60,
        className: 'text-center'
      },
      {
        Header: 'Date',
        accessor: 'date',
        className: 'text-center',
        minWidth: 200,
        Cell: row =>
          dateFormat(new Date(row.original.date), 'dddd, mmmm dS, yyyy')
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'text-center'
      },
      {
        Header: 'Vacancy',
        accessor: 'vacancy',
        maxWidth: 200,
        className: 'text-center'
      },
      {
        Header: 'CV',
        accessor: 'cv',
        maxWidth: 100,
        // Cell: row => <span className="text-success">{row.original.total}</span>,
        className: 'text-center',
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <a href={row.original.cv} download theme="white">
              <i className="material-icons">&#xE870;</i>
            </a>
          </ButtonGroup>
        )
      },
      {
        Header: 'Deviations',
        accessor: 'actions',
        maxWidth: 300,
        minWidth: 180,
        sortable: false,
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button theme="white" onClick={() => this.handleItemConfirm(row)}>
              <i className="material-icons">&#xE5CA;</i>
            </Button>
            <Button
              theme="white"
              onClick={() => this.handleItemViewDetails(row)}
            >
              <i className="material-icons">&#xE870;</i>
            </Button>
            <Button theme="white" onClick={() => this.handleItemEdit(row)}>
              <i className="material-icons">&#xE254;</i>
            </Button>
            <Button theme="white" onClick={() => this.handleItemDelete(row)}>
              <i className="material-icons">&#xE872;</i>
            </Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="pt-4">
          <Col md={6}>
            <SingleHeader backgroundImg={image} />
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
          <Col sm="6" className="d-flex">
            <FormCheckbox
              toggle
              checked={this.state.vacancySwitcher}
              className="ml-auto my-auto"
              id="conversationsEmailsToggle"
              onChange={() => {
                this.setState({ vacancySwitcher: !this.state.vacancySwitcher });
              }}
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
                >
                  Specs
                </Tab>
                <Tab
                  className="c-tabs mx-4"
                  selectedClassName="c-tabs--selected"
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {jobTitle}
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">{branch}</h6>
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {weekHours}
                          </h6>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col lg="3" key={7}>
                      <Card
                        small
                        className="file-manager__item file-manager__item--directory mb-3"
                      >
                        <CardFooter>
                          <span className="file-manager__item-icon">
                            <i className="material-icons">&#xE2C7;</i>{' '}
                          </span>
                          <h6 className="file-manager__item-title">
                            {distance}
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
                            <i className="material-icons">&#xE2C7;</i>{' '}
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
                        data={tableData}
                        pageSize={pageSize}
                        showPageSizeOptions={false}
                        resizable={false}
                        getTdProps={(state, rowInfo, column, instance) => {
                          return {
                            onClick: (e, handleOriginal) => {
                              console.log('It was in this row:', rowInfo);
                              this.setState({
                                modal: true,
                                modalInfo: rowInfo.original
                              });

                              if (handleOriginal) {
                                handleOriginal();
                              }
                            }
                          };
                        }}
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
        {this.state.modalInfo ? (
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
                <img
                  height="125"
                  width="125"
                  alt="profile"
                  className="rounded-circle"
                  src={this.state.modalInfo.image}
                />
                <h2 className="mt-4">{this.state.modalInfo.name}</h2>
                <p className="text-center mt-2">
                  Discovered had get considered projection who favourable.
                  Necessary up knowledge it tolerably. Unwilling departure
                  education to admitted speaking...
                </p>
              </div>
              <hr />
              <Row>
                <Col md={6}>
                  <div className="flex flex-column">
                    <h5 className="my-2">Email</h5>
                    <p className="my-0">steye.k@vindicat.nl</p>
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
                    <p className="my-0">+40 0123 456 789</p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="flex flex-column">
                    <h5 className="my-2">CV</h5>
                    <i className="material-icons">insert_drive_file</i>
                  </div>
                </Col>
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
    single_vacancy: state.vacancies.single_vacancy
  };
}

export default connect(
  mapStateToProps,
  { getSingleVacancy, deleteSingleVacancy }
)(SingleVacancy);