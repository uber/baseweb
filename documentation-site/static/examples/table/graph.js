import * as React from 'react';
import {styled} from 'baseui';
import Head from 'next/head';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from 'baseui/table';
import {AreaSeries, VerticalBarSeries, LineMarkSeries, XYPlot} from 'react-vis';

const GraphCell = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
const Left = styled('div', ({$theme}) => ({
  marginRight: $theme.sizing.scale600,
}));
const Right = styled('div', ({$theme}) => ({}));
const TopRange = styled('div', ({$theme}) => ({
  color: $theme.colors.mono800,
  ...$theme.typography.font400,
}));
const BottomRange = styled('div', ({$theme}) => ({
  color: $theme.colors.mono700,
  ...$theme.typography.font200,
}));
const StyledGraphCell = ({children}) => (
  <GraphCell>
    <Left>
      <TopRange>100%</TopRange>
      <BottomRange>0%</BottomRange>
    </Left>
    <Right>
      <XYPlot
        width={250}
        height={48}
        margin={{left: 6, right: 6, top: 6, bottom: 6}}
      >
        {children}
      </XYPlot>
    </Right>
  </GraphCell>
);

const seriesProps = {
  data: [
    {
      x: 0,
      y: 5,
    },
    {
      x: 1,
      y: 15,
    },
    {
      x: 2,
      y: 13,
    },
    {
      x: 3,
      y: 20,
    },
    {
      x: 4,
      y: 13,
    },
    {
      x: 5,
      y: 22,
    },
  ],
  opacity: 1,
  stroke: '#276EF1',
  fill: '#276EF1',
};

class GraphTable extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-vis/dist/style.css"
          />
        </Head>
        <StyledTable>
          <StyledHead>
            <StyledHeadCell>Description</StyledHeadCell>
            <StyledHeadCell>Graph</StyledHeadCell>
          </StyledHead>
          <StyledBody>
            <StyledRow>
              <StyledCell>Visitors</StyledCell>
              <StyledCell>
                <StyledGraphCell>
                  <AreaSeries {...seriesProps} />
                </StyledGraphCell>
              </StyledCell>
            </StyledRow>
            <StyledRow>
              <StyledCell>Revenue</StyledCell>
              <StyledCell>
                <StyledGraphCell>
                  <VerticalBarSeries {...seriesProps} />
                </StyledGraphCell>
              </StyledCell>
            </StyledRow>
            <StyledRow>
              <StyledCell>Bounce Rate</StyledCell>
              <StyledCell>
                <StyledGraphCell>
                  <LineMarkSeries {...seriesProps} />
                </StyledGraphCell>
              </StyledCell>
            </StyledRow>
          </StyledBody>
        </StyledTable>
      </React.Fragment>
    );
  }
}

export default GraphTable;
