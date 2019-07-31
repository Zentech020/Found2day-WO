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
  FormInput
} from 'shards-react';
import { connect } from 'react-redux';
import { getPayLink } from '../actions';
import PageTitle from '../components/common/PageTitle';
import getTransactionHistoryData from '../data/transaction-history-data';
import getFinanceData from '../data/finance-data';

class Finance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5],
      pageSize: 1,
      tableData: []
    };

    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemViewDetails = this.handleItemViewDetails.bind(this);
  }

  componentWillMount() {
    const tableData = getFinanceData();

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

  onPay = async () => {
    const group = sessionStorage.getItem('group');

    this.props.getPayLink(group._id, '230.00', 'EUR', 'ideal').then(res => {
      console.log(res);
      if (res.result.status == 200) {
        window.location.replace(res.result.data.mollieLink);
      }
    });
  };

  render() {
    const { tableData, pageSize, pageSizeOptions } = this.state;
    const tableColumns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 60,
        className: 'text-center'
      },
      {
        Header: 'Placement Date',
        accessor: 'date',
        className: 'text-center',
        minWidth: 200,
        Cell: row =>
          dateFormat(new Date(row.original.date), 'dddd, mmmm dS, yyyy')
      },
      {
        Header: 'Vacancy',
        accessor: 'vacancy',
        className: 'text-center'
      },
      {
        Header: 'Applicants',
        accessor: 'applicants',
        maxWidth: 200,
        className: 'text-center',
        Footer: <span>75</span>
      },
      {
        Header: 'total',
        accessor: 'total',
        maxWidth: 100,
        // Cell: row => <span className="text-success">{row.original.total}</span>,
        className: 'text-center',
        Footer: (
          <div className="d-flex flex-column">
            <span>$750</span>
            <Button onClick={() => this.onPay()} className="mt-2">
              Pay
            </Button>
          </div>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Finance"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                <Col className="file-manager__filters__rows d-flex" md="2">
                  <span>January</span>
                </Col>
                <Col className="file-manager__filters__rows d-flex" md="2">
                  <span>INVOICE</span>
                </Col>
                {/* Filters :: Page Size */}
                {/* <Col className="file-manager__filters__rows d-flex" md="6">
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
                </Col> */}

                {/* Filters :: Search */}
                {/* <Col className="file-manager__filters__search d-flex" md="6">
                  <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} />
                  </InputGroup>
                </Col> */}
              </Row>
            </Container>
          </CardHeader>
          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                // pageSize={pageSize}
                showPageSizeOptions={false}
                showPagination={false}
                resizable={false}
                minRows={0}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    payLink: state.Payment.link
  };
}

export default connect(
  null,
  { getPayLink }
)(Finance);
