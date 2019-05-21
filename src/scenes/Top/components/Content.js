import React, {Fragment} from 'react'
import styled from '@emotion/styled'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ContentDetail = (props) => (
  // 会社、タイトルはExpandPanelに表示してるため非表示、内容は長いので非表示
  props.keyName === "会社(A→Z)" || props.keyName === "タイトル" || props.keyName === "内容" ? null :
  // URLはaタグ
  props.keyName === "URL" ?
  <Info><InfoTitle>{props.keyName}</InfoTitle><InfoContent><a target="__brank" href={props.internInfo[props.keyName]}>こちら</a></InfoContent></Info> :
  props.keyName === "必要な(もしくはあると良い)スキル・経験" ?
  // keyが長いので短くする
  <Info><InfoTitle>歓迎スキル</InfoTitle><InfoContent>{props.internInfo[props.keyName]}</InfoContent></Info> :
  <Info><InfoTitle>{props.keyName}</InfoTitle><InfoContent>{props.internInfo[props.keyName]}</InfoContent></Info> 
)

const Content = (props) => (
  <ExpansionPanel expanded={props.expanded === props.index+1} onClick={() => props.handleChange(props.index+1,props.expanded === props.index+1)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Title><Company>{props.internInfo["会社(A→Z)"]}</Company><br/>{props.internInfo.タイトル}</Title>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{paddingLeft: 10, paddingRight: 10}}>
      <InfoWrapper >
        {Object.keys(props.internInfo).map((key) => (
          <ContentDetail keyName={key} internInfo={props.internInfo}/>
        ))}
      </InfoWrapper>
      </ExpansionPanelDetails>
  </ExpansionPanel>
)

const ContentList = (props) => (
  <ContentWrapper>
    <div style={{textAlign: "center",fontWeight: "bold", marginBottom: 20}}>2019サマーインターン一覧</div>
    {props.internInfoList.map((internInfo,index) => (
      (index >= props.page*10 && index < props.page*10 + 10) &&
      <Content index={index} internInfo={internInfo} expanded={props.expanded} handleChange={(index,expanded) => props.handleChange(index,expanded)}/>
    ))}
  </ContentWrapper>
)

export default ContentList

const ContentWrapper = styled("div")`
  font-family: sans-serif;
  width: 80%;
  margin: 50px auto;
  @media (max-width: 420px) {
    width: 100%;    
    margin: 30px auto;
  }
`;

const Company = styled("div")`
  font-size: 14px;
  font-weight: bold;
`;

const Title = styled(Typography)`
  font-size: 12px !important;
  margin: 18px 0;
`

const InfoWrapper = styled("div")`
  width: 100%;
  margin: 10px auto;
  padding: 0;
`;

const Info = styled("div")`
  font-family: sans-serif;
  font-size: 14px;
  margin: 10px;
  display: flex;
`;  

const InfoTitle = styled("div")`
  width: 100px;
`;

const InfoContent = styled("div")`
  width: 800px;
  margin-left: 1%;
  @media (max-width: 420px) {
    width: 250px;    
  }
`;
