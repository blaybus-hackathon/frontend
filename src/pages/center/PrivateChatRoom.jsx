import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import backArrow from '@/assets/images/back-arrow.png';
import addImg from '@/assets/images/add.png';
import chatStore from '@/store/jbStore/chatStore';
import { Button } from '@/components/ui/custom/Button';
import { request } from '@/api';
import {
  connectSocket,
  subscribe,
  sendMessage,
  disconnectSocket,
} from '@/components/chat/ChatSocket';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

// chat 입력창 최대 높이
const MAX_HEIGHT = 120;

//temporary code
const SENDERID = 7;

function PrivateChatRoom() {
  const roomId = useParams().roomid;
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const { chatInfo } = chatStore();

  const [isVisible, setIsvisible] = useState(false); //하단 토글바 visible 여부
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true); //다음 페이지 유무
  const [msgInput, setMsgInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const msgContainerRef = useRef();
  const prevScrollHeight = useRef(0);
  const firstRenderRef = useRef(true); // 최초 렌더링 여부
  const isFetching = useRef(true);
  const receiveMsg = useRef(false); // 메세지를 받는 경우 true

  // 헤더 세팅
  useEffect(() => {
    setHeaderProps({
      type: 'back',
      hasBorder: false,
      title: chatInfo.partnerName,
      onBack: () => {
        navigate('/chatrooms');
      },
    });

    return () => {
      clearHeaderProps();
    };
  }, []);

  useEffect(() => {
    //최초 채팅 세팅
    const setupSocket = async () => {
      connectSocket(() => {
        // 개인 메세지 구독 (상대 -> 나)
        subscribe('/user/queue/private', (message) => {
          const newMsg = {
            senderYn: false,
            content: message.content,
            readYn: false,
          };
          receiveMsg.current = true;
          setMessages((prev) => [newMsg, ...prev]);
        });

        // 오류 메세지 구독
        subscribe('/user/queue/error', (error) => {
          console.error('오류 발생:', error);
        });
      });
    };
    if (typeof window !== 'undefined') {
      setupSocket();
    }

    // 무한 스크롤 - 스크롤 상단에서 message fetch
    const container = msgContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return async () => {
      //언마운트 시 무한 스크롤 event 제거
      container?.removeEventListener('scroll', handleScroll);

      //언마운트 시 소켓 통신 해제
      disconnectSocket();
    };
  }, []);

  // 메세지 fetch 후 스크롤 고정
  useEffect(() => {
    if (msgContainerRef.current) {
      const container = msgContainerRef.current;
      if (isFetching.current || receiveMsg.current) {
        const newScrollHeight = container.scrollHeight;
        const heightDiff = newScrollHeight - prevScrollHeight.current;
        container.scrollTop += heightDiff;
        if (container.scrollHeight !== prevScrollHeight.current) {
          container.scrollTop = container.scrollHeight - prevScrollHeight.current;
        }

        isFetching.current = false;
        receiveMsg.current = false;
      } else {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  // 페이지 변동 시 메세지 추가 fetch
  useEffect(() => {
    getMessages();
  }, [page]);

  // 컨테이너 최상단 도달 시 page up
  const handleScroll = () => {
    const container = msgContainerRef.current;
    if (hasNext && container.scrollTop === 0) {
      setPage((prev) => prev + 1);
    }
  };

  const sendChatMessage = async () => {
    const message = {
      content: msgInput,
      senderId: SENDERID,
      receiverId: chatInfo.partnerId,
      patientLogId: chatInfo.patientLogId,
    };
    const newMsg = {
      senderYn: true,
      content: msgInput,
      readYn: false,
    };
    sendMessage('/app/private-message', message);
    setMessages((prev) => [newMsg, ...prev]);
  };

  // 메세지 fetch
  const getMessages = () => {
    if (isLoading) return;
    if (!hasNext) return;

    setIsLoading(true);

    // fetch 시 스크롤 위치 기억 (마운트 시 fetch 제외)
    if (!firstRenderRef.current) {
      prevScrollHeight.current = msgContainerRef.current;
    } else {
      firstRenderRef.current = false;
    }
    isFetching.current = true;

    request('get', `/chat/find-detail?pageNo=${page}&chatRoomId=${roomId}`)
      .then((res) => {
        setMessages((prev) => [...prev, ...res.list]);
        setHasNext(res.hasNext);
      })
      .catch(() => {
        console.error('채팅 불러오기 실패');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderMessages = () =>
    messages
      .slice()
      .reverse()
      .map((msg, idx) => (
        <div key={idx} className={`flex ${msg.senderYn ? 'justify-end' : 'gap-3'}`}>
          {!msg.senderYn && (
            <div className='bg-[var(--button-inactive)] size-12 rounded-[50%]'></div>
          )}
          <p
            className={`${
              msg.senderYn ? 'bg-[rgba(82,46,154,0.1)]' : 'bg-[var(--button-inactive)]'
            } flex items-center rounded-2xl py-3 px-5`}
          >
            {msg.content}
          </p>
        </div>
      ));

  const exitChatRoom = () => {
    request('post', '/chat/out-room', { chatRoomId: chatInfo.chatRoomId })
      .then(() => {
        navigate('/chatrooms');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const tuningComplete = () => {};

  return (
    <div className='max-w-md mx-auto pb-4 flex flex-col'>
      <div className='px-0.5 pt-6 pb-4.5 absolute top-6 bg-white'>
        <div className='flex items-center'>
          <img src={backArrow} alt='back-arrow' className='mr-8 size-8' />
          <p className='text-3xl font-semibold'>{chatInfo.partnerName}</p>
        </div>
      </div>
      <div
        className='mt-20 flex flex-col gap-7 h-4/5 overflow-y-auto'
        style={{ height: 'calc(100vh - 80px - 70px)' }}
        ref={msgContainerRef}
      >
        <div className='bg-[var(--button-inactive)] p-4 rounded-md'>
          <p>{`${chatInfo.partnerName}님은 ${chatInfo.patientLogName} 어르신과 연결되었어요!`}</p>
          <p className='underline'>박순자 어르신 프로필 보러가기</p>
        </div>
        {renderMessages()}
      </div>

      {/* 전송 바 */}
      {!isVisible && (
        <div className='absolute bottom-4 right-0 left-0 flex items-center gap-2.5 justify-between h-12 max-w-md mx-auto px-5.5'>
          <div>
            <img
              src={addImg}
              alt='add-image'
              onClick={() => {
                setIsvisible(true);
              }}
            />
          </div>
          <div className='flex-1 relative h-12'>
            <textarea
              className='rounded-md bg-[var(--button-inactive)] py-2 px-3 flex items-center leading-8 absolute left-0 right-0 bottom-0 min-h-12 resize-none'
              placeholder='메세지 보내기'
              rows={1}
              onInput={(e) => {
                //textarea 높이 초기화
                e.target.style.height = 'auto';
                //textarea 높이 늘리기
                e.target.style.height = `${Math.min(e.target.scrollHeight, MAX_HEIGHT)}px`;
                setMsgInput(e.target.value);
              }}
              value={msgInput}
            />
          </div>
          <div
            className='rounded-[100px] bg-[var(--button-inactive)] px-4 py-3 text-[var(--main)] h-12'
            onClick={() => {
              sendChatMessage();
              setMsgInput('');
            }}
          >
            전송
          </div>
        </div>
      )}

      {/* 하단 조정바 */}
      {isVisible && (
        <div className='absolute bottom-4 right-0 left-0 flex flex-col gap-3.5 px-5.5'>
          <Button variant={'white'} className='w-full' onClick={tuningComplete}>
            조율 완료
          </Button>
          <div>
            <Button className='bg-[var(--button-inactive)] text-[var(--text)] w-full border-0 border-b rounded-none rounded-t-md'>
              해당 어르신 프로필
            </Button>
            <Button
              className='bg-[var(--button-inactive)] text-[var(--required-red)] w-full border-0 rounded-none rounded-b-md'
              onClick={exitChatRoom}
            >
              채팅방 나가기
            </Button>
          </div>
          <Button
            className='bg-[var(--button-inactive)] text-[var(--text)] w-full border-0'
            onClick={() => {
              setIsvisible(false);
            }}
          >
            취소
          </Button>
        </div>
      )}
    </div>
  );
}

export default PrivateChatRoom;
