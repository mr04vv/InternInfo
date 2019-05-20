import React, {Fragment} from 'react'
import styled from '@emotion/styled'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Content = (props) => (
  <ContentWrapper>
    <div style={{textAlign: "center",fontWeight: "bold", marginBottom: 20}}>2019サマーインターン一覧</div>
    {props.internInfoList.map((internInfo,index) => (
      (index >= props.page*10 && index < props.page*10 + 10) &&
      <InternList expanded={props.expanded === index+1} onClick={() => props.handleChange(index+1,props.expanded === index+1)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Title><Company>{internInfo["会社(A→Z)"]}</Company><br/>{internInfo.タイトル}</Title>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{paddingLeft: 10, paddingRight: 10}}>
      <InfoWrapper >
        {Object.keys(internInfo).map((i) => (
          i === "会社(A→Z)" || i === "タイトル" || i === "内容" ? null :
          i === "URL" ?
          <Info><InfoTitle>{i}</InfoTitle><InfoContent><a href={internInfo[i]}>こちら</a></InfoContent></Info> :
          i === "必要な(もしくはあると良い)スキル・経験" ?
          <Info><InfoTitle>歓迎スキル</InfoTitle><InfoContent>{internInfo[i]}</InfoContent></Info> :
          <Info><InfoTitle>{i}</InfoTitle><InfoContent>{internInfo[i]}</InfoContent></Info> 
        ))}
      </InfoWrapper>
      </ExpansionPanelDetails>
      </InternList>
    ))}
  </ContentWrapper>
)

export default Content

const ContentWrapper = styled("div")`
  font-family: sans-serif;
  width: 80%;
  margin: 50px auto;
  @media (max-width: 420px) {
    width: 100%;    
    margin: 30px auto;
  }
`;

const InternList = styled(ExpansionPanel)`
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
