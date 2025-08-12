import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectSocket = async (callbackFunc) => {
  const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-chat`, null, {
    withCredentials: true,
  });

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    // 연결 성공
    onConnect: () => {
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
      try {
        const res = JSON.parse(msg.body);
        callbackFunc(res);
      } catch {
        callbackFunc(msg.body);
      }
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
