
/**
 * This is a mock implementation that replaced the original Supabase client.
 * It provides dummy implementations of the previously used methods to maintain compatibility.
 */

// A mock implementation of the Supabase client that does nothing but doesn't break existing code
export const supabase = {
  channel: (channelName: string) => {
    return {
      on: () => {
        return {
          subscribe: () => {
            console.log(`Mock subscription to channel ${channelName}`);
            return { unsubscribe: () => console.log(`Mock unsubscribe from ${channelName}`) };
          }
        };
      },
      send: () => {
        console.log(`Mock send to channel ${channelName}`);
        return true;
      }
    };
  },
  removeChannel: () => {
    console.log('Mock remove channel');
    return Promise.resolve(true);
  }
};

export default supabase;
