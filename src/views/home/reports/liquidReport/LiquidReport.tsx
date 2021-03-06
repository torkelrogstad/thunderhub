import React from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory';
import { useAccountState } from 'src/context/AccountContext';
import { useGetLiquidReportQuery } from 'src/graphql/queries/__generated__/getChannelReport.generated';
import {
  CardWithTitle,
  SubTitle,
  Card,
} from '../../../../components/generic/Styled';
import { useConfigState } from '../../../../context/ConfigContext';
import {
  chartGridColor,
  chartAxisColor,
  liquidityBarColor,
} from '../../../../styles/Themes';
import { LoadingCard } from '../../../../components/loading/LoadingCard';
import { getPrice } from '../../../../components/price/Price';
import { usePriceState } from '../../../../context/PriceContext';

export const LiquidReport = () => {
  const { auth } = useAccountState();

  const { theme, currency, displayValues } = useConfigState();
  const priceContext = usePriceState();
  const format = getPrice(currency, displayValues, priceContext);

  const { data, loading } = useGetLiquidReportQuery({
    skip: !auth,
    variables: { auth },
  });

  if (loading) {
    return <LoadingCard title={'Liquidity Report'} />;
  }

  if (!data?.getChannelReport) return null;

  const { local, remote, maxIn, maxOut, commit } = data.getChannelReport;

  const liquidity = [
    { x: 'Total Commit', y: commit },
    { x: 'Max Outgoing', y: maxOut },
    { x: 'Max Incoming', y: maxIn },
    { x: 'Local Balance', y: local },
    { x: 'Remote Balance', y: remote },
  ];

  return (
    <CardWithTitle>
      <SubTitle>Liquidity Report</SubTitle>
      <Card mobileCardPadding={'8px 0'}>
        <VictoryChart
          height={100}
          domainPadding={10}
          padding={{
            top: 10,
            left: 100,
            right: 50,
            bottom: 20,
          }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={({ datum }) => `${format({ amount: datum.y })}`}
              labelComponent={<VictoryTooltip orientation={'left'} />}
            />
          }
        >
          <VictoryAxis
            style={{
              axis: { stroke: chartGridColor[theme] },
              tickLabels: {
                fill: chartAxisColor[theme],
                fontSize: 8,
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: {
                fill: chartAxisColor[theme],
                fontSize: 8,
              },
              grid: { stroke: chartGridColor[theme] },
              axis: { stroke: 'transparent' },
            }}
            tickFormat={a => `${format({ amount: a, breakNumber: true })}`}
          />
          <VictoryBar
            horizontal
            data={liquidity}
            style={{
              data: {
                fill: liquidityBarColor[theme],
                width: 10,
              },
              labels: {
                fontSize: 8,
              },
            }}
          />
        </VictoryChart>
      </Card>
    </CardWithTitle>
  );
};
