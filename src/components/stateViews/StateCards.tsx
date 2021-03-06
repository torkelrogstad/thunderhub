import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import styled from 'styled-components';
import { SubTitle, Card } from '../generic/Styled';
import { themeColors, mediaWidths, fontColors } from '../../styles/Themes';
import { SectionTitle } from '../typography/Styled';
import { CurrentSettings } from '../../views/settings/Current';
import { AccountSettings } from '../../views/settings/Account';
import { DangerView } from '../../views/settings/Danger';

const FullDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 400px;

  @media (${mediaWidths.mobile}) {
    justify-content: center;
  }
`;

export const LoadingView = () => (
  <FullDiv>
    <SubTitle>Connecting to your Node</SubTitle>
    <ScaleLoader height={20} color={themeColors.blue3} />
  </FullDiv>
);

const StyledTitle = styled(SectionTitle)`
  text-align: center;
  margin: 16px 0 32px;
`;

const StyledSubtitle = styled(SubTitle)`
  text-align: center;
  margin: 48px 0 4px;
`;

const StyledParagraph = styled.p`
  color: ${fontColors.grey7};
  text-align: center;
  margin: 4px 0;
`;

export const ErrorView = () => (
  <>
    <Card>
      <StyledTitle textColor={fontColors.blue3}>Connection Error</StyledTitle>
      <StyledParagraph>
        ThunderHub was unable to connect to your node.
      </StyledParagraph>
      <StyledParagraph>
        {`Please make sure it's online and that the connection details are correct.`}
      </StyledParagraph>
      <StyledSubtitle>
        If the problem persists please contact us.
      </StyledSubtitle>
    </Card>
    <CurrentSettings />
    <AccountSettings />
    <DangerView />
  </>
);
