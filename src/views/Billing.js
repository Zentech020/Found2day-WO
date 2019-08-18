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
import { getPayLink, getUpcomingInvoice } from '../actions';
import PageTitle from '../components/common/PageTitle';
import getTransactionHistoryData from '../data/transaction-history-data';
import getBillingData from '../data/billing-data';

class Billing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5],
      pageSize: 1,
      tableData: [],
      invoice: {}
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

  componentDidMount = async () => {
    const tableData = await getBillingData();

    // Initialize the fuzzy searcher.
    this.searcher = new FuzzySearch(tableData, ['customer', 'status'], {
      caseSensitive: false
    });
    
    console.log('action');
    

    await this.props.getUpcomingInvoice(JSON.parse(sessionStorage.getItem('group')).stripeCustomerId);
    console.log(this.props);
    
    
    this.setState({
      ...this.state,
      tableData,
      invoice: this.props.invoice
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

  renderTable = (tableColumns, tableData, period_start, period_end, next_payment_attempt) =>
    <Card className="p-0">
    <CardHeader className="p-0">
      <Container fluid className="file-manager__filters border-bottom">
        <Row>
          <Col className="file-manager__filters__rows d-flex" md="2">
            <span>UPCOMING INVOICE{console.log(this.props.invoice)}</span>
          </Col>
          <Col className="file-manager__filters__rows d-flex" md="6">
            <span>Invoice for period {period_start} - {period_end}</span>
          </Col>
          <Col className="file-manager__filters__rows d-flex" md="4">
            <span>Will be sent on {next_payment_attempt} to {'!EMAIL!'}</span>
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
          {this.props.invoice &&
            <ReactTable
              columns={tableColumns}
              data={this.props.invoice.upcomingInvoice.lines.data}
              // pageSize={pageSize}
              showPageSizeOptions={false}
              showPagination={false}
              resizable={false}
              minRows={0}
            />
          }

      </div>
    </CardBody>
  </Card>
  

  render() {
    const { tableData, pageSize, pageSizeOptions } = this.state;
    let amount_due, period_start, period_end, next_payment_attempt;
    if (this.props.invoice) {
      amount_due = this.props.invoice.upcomingInvoice.amount_due;
      period_start = new Date(this.props.invoice.upcomingInvoice.period_start * 1000).toLocaleString();
      period_end = new Date(this.props.invoice.upcomingInvoice.period_end * 1000).toLocaleString();
      next_payment_attempt = new Date(this.props.invoice.upcomingInvoice.next_payment_attempt * 1000).toLocaleString();
    }
    const tableColumns = [
      // {
      //   Header: '#',
      //   accessor: 'id',
      //   maxWidth: 500,
      //   className: 'text-center'
      // },
      // {
      //   Header: 'Placement Date',
      //   accessor: 'date',
      //   className: 'text-center',
      //   minWidth: 200,
      //   Cell: row =>
      //     dateFormat(new Date(row.original.date), 'dddd, mmmm dS, yyyy')
      // },
      {
        Header: 'Vacancy',
        accessor: 'metadata.vacancyName',
        className: 'text-center'
      },
      {
        Header: 'Amount of applicants',
        accessor: 'quantity',
        maxWidth: 200,
        className: 'text-center'
        // Footer: <span>{tableData.reduce((total, d) => total + d.quantity)}</span>
      },
      {
        Header: 'Cost per applicant',
        accessor: 'quantity',
        maxWidth: 200,
        className: 'text-center',
        Footer: <span></span>,
        Cell: row => 59.99.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      },
      {
        Header: 'Total',
        accessor: 'amount',
        maxWidth: 100,
        // Cell: row => <span className="text-success">{row.original.total}</span>,
        className: 'text-center',
        Cell: row => (parseFloat(row.original.amount) / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
        Footer: (
          <div className="d-flex flex-column">
            <span>{(amount_due / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</span>
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
            title="Billing"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        {this.renderTable(tableColumns, tableData, period_start, period_end, next_payment_attempt)}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  
  return {
    invoice: state.UpcomingInvoice.data
  };
}

export default connect(
  mapStateToProps,
  { getUpcomingInvoice }
)(Billing);