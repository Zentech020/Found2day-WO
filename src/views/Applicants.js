import React from 'react';
import ReactTable from 'react-table';
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
  Modal,
  ModalBody,
  ModalHeader
} from 'shards-react';
import { connect } from 'react-redux';

import PageTitle from '../components/common/PageTitle';
import DeviationModal from '../components/applicants/deviationModal';
import { getApplicationsByGroup, getApplicantCV, getDeviation } from '../actions/index';
import amplitude from 'amplitude-js';
var employerAnalytics = amplitude.getInstance();

class Applicants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      applications: [],
      modal: false,
      modalInfo: null,
      openDeviationModal:false,
      userInfo:null
    };

    this.searcher = null;

    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemViewDetails = this.handleItemViewDetails.bind(this);
  }

  componentWillMount = async() => {
    const group = JSON.parse(sessionStorage.getItem('group'));
    if(group) {
      await this.props.getApplicationsByGroup(group._id);
    }

    this.setState({
      ...this.state,
      applications:this.props.applications
    });

    // Initialize the fuzzy searcher.
    this.searcher = new FuzzySearch(this.state.applications, ['name', 'vacancyTitle'], {
      caseSensitive: false
    });
    console.log(this.searcher);
  }


  componentDidMount = async() => {

    const group = JSON.parse(sessionStorage.getItem('group'));

    if(group) {
      await this.props.getApplicationsByGroup(group._id);
      this.setState({
        applications:this.props.applications
      })
    }
    this.searcher = new FuzzySearch(this.state.applications, ['name', 'vacancyTitle'], {
      caseSensitive: false
    });
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
    // setTimeout(() => employerAnalytics.logEvent('search')}, 300);
    setTimeout(() => console.log('search'), 3000);
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

  onGetCV = (applicantToken) => {
    this.props.getApplicantCV(applicantToken).then((res) => {
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSetDeviations = async(row) => {
    console.log(row);
    await this.props.getDeviation(row.original.vacancyId, row.original.applicantToken);

    if (row) {
      this.setState({
        openDeviationModal:true,
        modal:true,
        userInfo:row.original,
        deviations:this.props.deviations
      })
    }
  }

  render() {

    const { pageSize, pageSizeOptions } = this.state;
    const {applications, userInfo} = this.state;
    const {deviations} = this.props;
    const tableColumns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 60,
        className: 'text-center',
        Cell: row => <div>{row.index +1 }</div>
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
            <div style={{cursor:'pointer'}} onClick={() => this.onGetCV(row.original.applicantToken)}>
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
      <Container fluid className="main-content-container px-2 px-sm-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Applicants"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                {/* Filters :: Page Size */}
                <Col className="file-manager__filters__rows d-flex" md="6">
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
                <Col className="file-manager__filters__search d-flex" md="6">
                  <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} onBlur={() => employerAnalytics.logEvent('search applicant')}/>
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
        {this.state.openDeviationModal ? (
          <Modal
            open={this.state.modal}
            toggle={() => this.toggle()}
            position="center"
          >
            {/* <ModalHeader
              className="popup__bg"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1477948879622-5f16e220fa42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)'
              }}
            /> */}
            <ModalBody>
              <div className="popup__basic-info d-flex flex-column justify-content-center align-items-left">
                <h2 className="my-4">{this.state.userInfo.name}</h2>
                <h4 className="mb-2">Motivation</h4>
                <label className="text-left my-0">{userInfo.motivation ? this.state.userInfo.motivation : 'Applicant has not filled in a motivation.'}</label>
              </div>
              <hr />
              <Row>
                <Col md={12}>
                  <h4 className="mb-2">User information</h4>
                  <label>Quisque id mi. Nam adipiscing. Morbi vestibulum volutpat enim.</label>
                </Col>
                <Col md={6}>
                  <div className="flex flex-column">
                    <p className="my-2">Email</p>
                    <label className="my-0">{this.state.userInfo.email}</label>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="flex flex-column">
                    <p className="my-2">Phone</p>
                    <label className="my-0">{this.state.userInfo.phone}</label>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row className="mt-4">
                <Col md={12} className="mb-4">
                  <h4 className="mb-2">Deviations</h4>
                  <label>Quisque id mi. Nam adipiscing. Morbi vestibulum volutpat enim.</label>
                </Col>
                <Col md={12}>
                  <DeviationModal deviations={this.state.deviations}/>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        ) : null}
      </Container>
    );
  }
}

//Connect redux
function mapStateToProps(state) {
  return {
    applications: state.applicants.applications,
    deviations: state.applicants.deviations,
  };
}

export default connect(
  mapStateToProps,
  { getApplicationsByGroup, getApplicantCV, getDeviation }
)(Applicants);
