function createWebSocket(activeChannelId) {
  return new WebSocket(
    `wss://sellitapi.herokuapp.com/${activeChannelId}/chat/`
  );
}

export default createWebSocket;
