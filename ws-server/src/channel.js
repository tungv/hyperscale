import { get, isEmpty, omit } from 'lodash';

export type Connection = {
  connId: string,
  channel: string[]
};

export type Client = {
  clientId: string,
  connections: {
    [connId: string]: Connection,
  }
};

export type Store = {
  [clientId: string]: Client
};

export const addConnection = (store: Store, clientId: string, connection: Connection) : Store => {
  return {
    ...store,
    [clientId]: {
      clientId,
      connections: {
        ...get(store, `${ clientId }.connections`),
        [connection.connId]: connection
      }
    }
  };
};

export const removeConnection = (store: Store, clientId, connection: Connection) : Store => {
  const client = store[clientId];
  if (!client) {
    return store;
  }

  const {
    [connection.connId]: conn,
    ...others
  } = client.connections;

  if (isEmpty(others)) {
    return omit(store, clientId);
  }

  return {
    ...store,
    [clientId]: {
      clientId,
      connections: others
    }
  }
};
