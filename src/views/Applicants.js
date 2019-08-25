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
import RangeDatePicker from '../components/common/RangeDatePicker';
import DeviationModal from '../components/applicants/deviationModal';
import { getApplicationsByGroup, getApplicantCV, getDeviation } from '../actions/index';

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
    console.log(e.target.value);
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSetDeviations = async(vacancyId) => {
    await this.props.getDeviation(vacancyId);
    this.setState({
      openDeviationModal:true,
      modal:true,
    })
  }

  render() {


    const { pageSize, pageSizeOptions } = this.state;
    const {applications} = this.state;
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
        dateFormat(new Date(row.original.createdAt), 'dddd, mmmm dS, yyyy')
      },
      {
        Header: 'name',
        accessor: 'name',
        className: 'text-center'
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
        maxWidth: 100,
        // Cell: row => <span className="text-success">{row.original.total}</span>,
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
        Header: 'Deviations',
        accessor: 'actions',
        maxWidth: 300,
        minWidth: 180,
        sortable: false,
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button onClick={() => this.onSetDeviations(row.original.vacancyId)}>See Job deviations</Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Applicants"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <RangeDatePicker className="justify-content-end" />
          </Col>
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
                // getTdProps={(state, rowInfo, column, instance) => {
                //   return {
                //     onClick: (e, handleOriginal) => {
                //       console.log('It was in this row:', rowInfo);
                //       this.setState({
                //         modal: true,
                //         modalInfo: rowInfo.original
                //       });

                //       // IMPORTANT! React-Table uses onClick internally to trigger
                //       // events like expanding SubComponents and pivots.
                //       // By default a custom 'onClick' handler will override this functionality.
                //       // If you want to fire the original onClick handler, call the
                //       // 'handleOriginal' function.
                //       if (handleOriginal) {
                //         handleOriginal();
                //       }
                //     }
                //   };
                // }}
              />
            </div>
          </CardBody>
        </Card>
        {this.state.openDeviationModal ? (
          <Modal
            open={this.state.modal}
            toggle={() => this.toggle()}
            position="center"
            className="c-modal"
          >
                      <DeviationModal
                        deviations={this.props.deviations}
                      />
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
