import * as React from 'react';
import { Spacer } from 'src/components/spacer/Spacer';
import { withApollo } from 'config/client';
import { ServerAccounts } from 'src/components/accounts/ServerAccounts';
import { useAccountState } from 'src/context/AccountContext';
import getConfig from 'next/config';
import { ThunderStorm } from 'src/views/homepage/HomePage.styled';
import { appendBasePath } from 'src/utils/basePath';
import { SessionLogin } from '../src/views/login/SessionLogin';
import { TopSection } from '../src/views/homepage/Top';
import { LoginBox } from '../src/views/homepage/LoginBox';
import { Accounts } from '../src/views/homepage/Accounts';
import { LoadingCard } from '../src/components/loading/LoadingCard';
import { Section } from '../src/components/section/Section';

const { publicRuntimeConfig } = getConfig();
const { noClient } = publicRuntimeConfig;

const ContextApp = () => {
  const { finishedFetch } = useAccountState();

  return (
    <>
      <ThunderStorm alt={''} src={appendBasePath('/static/thunderstorm.gif')} />
      <TopSection />
      {!finishedFetch && (
        <Section color={'transparent'}>
          <LoadingCard loadingHeight={'160px'} />
        </Section>
      )}
      {finishedFetch && (
        <>
          <SessionLogin />
          <Accounts />
          {!noClient && <LoginBox />}
        </>
      )}
      <Spacer />
    </>
  );
};

const Wrapped = () => (
  <>
    <ServerAccounts />
    <ContextApp />
  </>
);

export default withApollo(Wrapped);
