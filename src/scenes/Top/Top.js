import React, { Fragment } from 'react';
import ContentList from './components/Content';
import { connect } from "react-redux";
import { fetchInternInfo } from "../../redux/modules/interninfo/InternInfo";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@emotion/styled';
import TablePagination from '@material-ui/core/TablePagination';
import { TablePaginationActionsWrapped } from './components/TablePageActions';

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

  render() {
    return (
      // <div>aaaa</div>
      !this.state.isLoading ?
      <Fragment>
        
      <ContentList internInfoList={this.props.internInfo} expanded={this.state.expanded} handleChange={(index,expanded) => this.handleChange(index,expanded)} page={this.state.page}/>
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

