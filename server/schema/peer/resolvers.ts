import { getPeers, removePeer, addPeer } from 'ln-service';
import { ContextType } from 'server/types/apiTypes';
import { logger } from 'server/helpers/logger';
import { requestLimiter } from 'server/helpers/rateLimiter';
import {
  getAuthLnd,
  getErrorMsg,
  getCorrectAuth,
} from 'server/helpers/helpers';
import { to } from 'server/helpers/async';

interface PeerProps {
  bytes_received: number;
  bytes_sent: number;
  is_inbound: boolean;
  is_sync_peer: boolean;
  ping_time: number;
  public_key: string;
  socket: string;
  tokens_received: number;
  tokens_sent: number;
}

export const peerResolvers = {
  Query: {
    getPeers: async (_: undefined, params: any, context: ContextType) => {
      await requestLimiter(context.ip, 'getPeers');

      const auth = getCorrectAuth(params.auth, context);
      const lnd = getAuthLnd(auth);

      const { peers }: { peers: PeerProps[] } = await to(
        getPeers({
          lnd,
        })
      );

      return peers.map(peer => ({
        ...peer,
        partner_node_info: { lnd, publicKey: peer.public_key },
      }));
    },
  },
  Mutation: {
    addPeer: async (_: undefined, params: any, context: ContextType) => {
      await requestLimiter(context.ip, 'addPeer');

      const { url, publicKey, socket, isTemporary } = params;

      if (!url && !publicKey && !socket) {
        logger.error('Expected public key and socket to connect');
        throw new Error('ExpectedPublicKeyAndSocketToConnect');
      }

      let peerSocket = socket || '';
      let peerPublicKey = publicKey || '';

      if (url) {
        const parts = url.split('@');

        if (parts.length !== 2) {
          logger.error(`Wrong url format to connect (${url})`);
          throw new Error('WrongUrlFormatToConnect');
        }

        peerPublicKey = parts[0];
        peerSocket = parts[1];
      }

      const auth = getCorrectAuth(params.auth, context);
      const lnd = getAuthLnd(auth);

      try {
        const success: boolean = await addPeer({
          lnd,
          public_key: peerPublicKey,
          socket: peerSocket,
          is_temporary: isTemporary,
        });
        return success;
      } catch (error) {
        logger.error('Error adding peer: %o', error);
        throw new Error(getErrorMsg(error));
      }
    },
    removePeer: async (_: undefined, params: any, context: ContextType) => {
      await requestLimiter(context.ip, 'removePeer');

      const auth = getCorrectAuth(params.auth, context);
      const lnd = getAuthLnd(auth);

      try {
        const success: boolean = await removePeer({
          lnd,
          public_key: params.publicKey,
        });
        return success;
      } catch (error) {
        logger.error('Error removing peer: %o', error);
        throw new Error(getErrorMsg(error));
      }
    },
  },
};
