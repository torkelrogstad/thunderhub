import { getParsedAccount } from './fileHelpers';

import { existsSync, readFileSync } from 'fs';
const mockedExistsSync: jest.Mock = existsSync as any;
const mockedReadFileSync: jest.Mock = readFileSync as any;

jest.mock('fs');

describe('getParsedAccount', () => {
  const masterPassword = 'master password';
  it('returns null without an account name', () => {
    const raw = {
      lndDir: 'LND DIR',
      name: '',
      certificate: 'RAW CERT',
      serverUrl: 'server.url',
      macaroon: 'RAW MACAROON',
    };

    const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
    expect(account).toBeNull();
  });

  it('returns null on invalid network', () => {
    const raw = {
      lndDir: 'LND DIR',
      name: 'name',
      certificate: 'RAW CERT',
      serverUrl: 'server.url',
      macaroon: 'RAW MACAROON',
      network: 'foo' as any,
    };

    const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
    expect(account).toBeNull();
  });

  it('returns null without an account server url', () => {
    const raw = {
      name: 'NAME',
      certificate: 'RAW CERT',
      serverUrl: '',
      macaroon: 'RAW MACAROON',
    };

    const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
    expect(account).toBeNull();
  });

  it('defaults to given bitcoin network', () => {
    const raw = {
      name: 'NAME',
      serverUrl: 'server.url',
      lndDir: 'lnd dir',
    };

    mockedExistsSync.mockReturnValue(true);
    mockedReadFileSync.mockImplementation(file => {
      if ((file as string).includes('tls.cert')) {
        return 'cert';
      }

      if ((file as string).includes('regtest/admin.macaroon')) {
        return 'macaroon';
      }
      return 'something else ';
    });
    const account = getParsedAccount(raw, 0, masterPassword, 'regtest');
    expect(account.macaroon).toContain('macaroon');
  });

  it('picks up other networks', () => {
    const raw = {
      name: 'NAME',
      serverUrl: 'server.url',
      lndDir: 'lnd dir',
      network: 'testnet',
    } as const;

    mockedExistsSync.mockReturnValue(true);
    mockedReadFileSync.mockImplementation(file => {
      if ((file as string).includes('tls.cert')) {
        return 'cert';
      }

      if ((file as string).includes('testnet/admin.macaroon')) {
        return 'macaroon';
      }
      return 'something else ';
    });
    const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
    expect(account.macaroon).toContain('macaroon');
  });

  describe('macaroon handling', () => {
    it('defaults to raw macaroon', () => {
      const raw = {
        lndDir: 'LND DIR',
        name: 'NAME',
        certificate: 'RAW CERT',
        serverUrl: 'server.url',
        macaroon: 'RAW MACAROON',
        macaroonPath: 'MACAROON PATH',
      };

      const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
      expect(account.macaroon).toBe('RAW MACAROON');
    });
    it('falls back to macaroon path after that', () => {
      const raw = {
        lndDir: 'LND DIR',
        name: 'NAME',
        certificate: 'RAW CERT',
        certificatePath: 'CERT PATH',
        serverUrl: 'server.url',
        macaroon: '',
        macaroonPath: 'MACAROON PATH',
      };
      mockedExistsSync.mockReturnValueOnce(true);
      mockedReadFileSync.mockImplementationOnce(file => {
        if ((file as string).includes(raw.macaroonPath)) {
          return 'yay';
        } else {
          return 'nay';
        }
      });
      const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
      expect(account.macaroon).toBe('yay');
    });

    it('falls back to lnd dir finally', () => {
      const raw = {
        lndDir: 'LND DIR',
        name: 'NAME',
        certificate: 'RAW CERT',
        certificatePath: 'CERT PATH',
        serverUrl: 'server.url',
        macaroon: '',
        macaroonPath: '',
      };
      mockedExistsSync.mockReturnValueOnce(true);
      mockedReadFileSync.mockImplementationOnce(file => {
        if ((file as string).includes(raw.lndDir)) {
          return 'yay';
        } else {
          return 'nay';
        }
      });
      const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
      expect(account.macaroon).toBe('yay');
    });
  });

  describe('certificate handling', () => {
    it('defaults to raw certificate', () => {
      const raw = {
        lndDir: 'LND DIR',
        name: 'NAME',
        certificate: 'RAW CERT',
        certificatePath: 'CERT PATH',
        serverUrl: 'server.url',
        macaroon: 'RAW MACAROON',
      };

      const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
      expect(account.cert).toBe('RAW CERT');
    });

    it('falls back to certificate path after that', () => {
      const raw = {
        lndDir: 'LND DIR',
        name: 'NAME',
        certificatePath: 'CERT PATH',
        serverUrl: 'server.url',
        macaroon: 'RAW MACAROON',
      };
      mockedExistsSync.mockReturnValueOnce(true);
      mockedReadFileSync.mockImplementationOnce(file => {
        if ((file as string).includes(raw.certificatePath)) {
          return 'yay';
        } else {
          return 'nay';
        }
      });
      const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
      expect(account.cert).toBe('yay');
    });

    it('falls back to lnd dir finally', () => {
      const raw = {
        lndDir: 'LND DIR',
        name: 'NAME',
        serverUrl: 'server.url',
        macaroon: 'RAW MACAROON',
      };
      mockedExistsSync.mockReturnValueOnce(true);
      mockedReadFileSync.mockImplementationOnce(file => {
        if ((file as string).includes(raw.lndDir)) {
          return 'yay';
        } else {
          return 'nay';
        }
      });
      const account = getParsedAccount(raw, 0, masterPassword, 'mainnet');
      expect(account.cert).toBe('yay');
    });
  });
});
