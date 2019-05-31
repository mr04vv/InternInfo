import React, { Fragment } from 'react'
import ContentList from './components/Content'
import { connect } from "react-redux"
import { fetchInternInfo } from "../../redux/modules/interninfo/InternInfo"
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from '@emotion/styled'
import TablePagination from '@material-ui/core/TablePagination'
import { TablePaginationActionsWrapped } from './components/TablePageActions'

class Top extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      expanded: false,
      internInfoList: null,
      page: 0
    };
  }

  componentDidMount() {
    

    this.props.fetchInternInfo().then(() => {
      const list = this.props.internInfo.filter(info => info["会社(A→Z)"] != null)
      console.debug(this.props.internInfo)
      this.setState({
        internInfoList: list,
        isLoading: false
      });
    });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  }


  handleChange (index, expanded) {
    this.setState({
      expanded: !expanded ? index : false,
    });
  }

  render() {
    return (
      !this.state.isLoading ?
      <Fragment>
      <ContentList internInfoList={this.state.internInfoList} expanded={this.state.expanded} handleChange={(index,expanded) => this.handleChange(index,expanded)} page={this.state.page}/>
      <PageWrapper>
      <TablePagination
        rowsPerPageOptions={[5]}
        colSpan={3}
        count={this.state.internInfoList.length}
        rowsPerPage={10}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActionsWrapped}
                />
      </PageWrapper>
      <Creator>created by <CreatorName href={"https://mooriii.com"} target="__brank">Takuto Mori</CreatorName></Creator>
      <Privacy>当サイトでは、アクセス解析のためにGoogleアナリティクスを使用しています。
 
 このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
 このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
 この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
 なおこの規約に関しまして、詳細は<a href={"https://www.google.com/analytics/terms/jp.html"}>Googleアナリティクス利用規約</a>
 にてご確認ください。</Privacy>
      </Fragment> :
      <Loading/>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInternInfo: () => dispatch(fetchInternInfo())
});

const mapStateToProps = state => ({
  internInfo: state.fetchInternInfo.data
});

const Loading = styled(CircularProgress)`
  display: block !important;
  margin: 20% auto;
`;

const PageWrapper = styled("div")`
  width: fit-content;
  margin: 0 auto 30px;
`;

const Creator = styled("div")`
  font-size: 11px;
  color: gray;
  width: fit-content;
  margin: 5px auto;
`;

const CreatorName = styled("a")`
  :hover{
    cursor: pointer;
  }
`;

const Privacy = styled("div")`
  width: 80%;
  font-size: 10px;
  color: gray;
  margin: 20px auto;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

export default connect(mapStateToProps,mapDispatchToProps)(Top);

