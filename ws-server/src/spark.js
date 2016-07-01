import * as MESSAGES from './copy.js';
import {
  addConnection,
  removeConnection,
} from './channel.js';

let store = {};

export const getClientDataFromSpark = ({ query }) => {
  const { channels } = query;
  const channelsArray = (channels || '').split(',');
  return {
    ...query,
    channels: channelsArray
  };
};

const debug = data => {
  switch (data) {
    case 'GET_STORE': return store;
    default: false;
  }
};

export const onConnection = spark => {
  console.log('new connection', spark);

  const { clientId, channels } = getClientDataFromSpark(spark);
  const connection = { connId: spark.id, channels, spark };

  if (clientId) {
    store = addConnection(store, clientId, connection);
  }

  spark.on('end', () => {
    store = removeConnection(store, clientId, connection);
  });

  spark.on('data', data => {
    if (process.env.NODE_ENV !== 'production') {
      const debugValue = debug(data);
      console.log('debugValue', debugValue);
      if (debugValue) {
        spark.write(debugValue);
        return;
      }
    }
    spark.write(MESSAGES.ERROR_SENDING_TO_SERVER_NOT_SUPPORTED);
  });
}
