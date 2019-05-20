import React, { Fragment } from 'react'
import Content from './components/Content'
import { connect } from "react-redux"
import { fetchInternInfo } from "../../redux/modules/interninfo/InternInfo"
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@emotion/styled'
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});


class Top extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      expanded: false,
      page: 0
    }
  }

  componentDidMount() {
    this.props.fetchInternInfo().then(() => {
      this.setState({
        isLoading: false
      })
    })
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  handleChange (index, expanded) {
    this.setState({
      expanded: !expanded ? index : false,
    });
  };

  handlePage() {
    this.setState({
      page: this.state.page+1
    })
    console.debug("here")
  }

  render() {
    return (
      // <div>aaaa</div>
      !this.state.isLoading ?
      <Fragment>
        
      <Content internInfoList={this.props.internInfo} expanded={this.state.expanded} handleChange={(index,expanded) => this.handleChange(index,expanded)} page={this.state.page}/>
      <PageWrapper>
      <TablePagination
        rowsPerPageOptions={[5]}
        colSpan={3}
        count={this.props.internInfo.length}
        rowsPerPage={10}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActionsWrapped}

                />
      </PageWrapper>
      </Fragment> :
      <Loading/>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInternInfo: () => dispatch(fetchInternInfo())
})

const mapStateToProps = state => ({
  internInfo: state.fetchInternInfo.data
});

const Loading = styled(CircularProgress)`
  display: block !important;
  margin: 20% auto;
`;

const PageWrapper = styled("div")`
  width: fit-content;
  margin: 30px auto;
`;

export default connect(mapStateToProps,mapDispatchToProps)(Top)

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});