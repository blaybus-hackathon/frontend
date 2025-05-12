// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectSocket = async (callbackFunc) => {
  if (typeof window === 'undefined') return;

  const SockJS = (await import('sockjs-client')).default;
  const { Client } = await import('@stomp/stompjs');

  const socket = new SockJS('http://localhost:8080/ws-chat', null, { withCredentials: true });

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    // 연결 성공
    onConnect: () => {
      console.log('success');
      callbackFunc();
    },
    onStompError: (e) => {
      console.error('Stomp 오류' + e);
    },
  });

  stompClient.activate();
};

// 구독
export const subscribe = (url, callbackFunc) => {
  if (stompClient && stompClient.connected) {
    stompClient.subscribe(url, (msg) => {
      callbackFunc(JSON.parse(msg.body));
    });
  } else {
    console.error('WebSocket이 연결되지 않았습니다.');
  }
};

export const sendMessage = (destination, payload) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
    });
  } else {
    console.error('WebSocket 연결이 필요합니다.');
  }
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log('WebSocket 연결이 종료되었습니다.');
  }
};
