import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useOptimistic, startTransition } from 'react';

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
import useAuthStore from '@/store/useAuthStore';
import defaultProfile from '@/assets/images/elder-basic-profile.png';

// chat 입력창 최대 높이
const MAX_HEIGHT = 120;

function PrivateChatRoom() {
  const roomId = useParams().roomid;
  const navigate = useNavigate();

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);
  const { chatInfo } = chatStore();
  const { user } = useAuthStore();

  const [isVisible, setIsvisible] = useState(false); //하단 토글바 visible 여부
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true); //다음 페이지 유무
  const [msgInput, setMsgInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [optMessages, setOptMessages] = useOptimistic(messages, (state, newMsg) => [
    newMsg,
    ...state,
  ]);

  const msgContainerRef = useRef();
  const prevScrollHeight = useRef(0);
  const firstRenderRef = useRef(true); // 최초 렌더링 여부
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
  }, [chatInfo.partnerName, clearHeaderProps, navigate, setHeaderProps]);

  useEffect(() => {
    // 컨테이너 최상단 도달 시 page up
    const handleScroll = () => {
      const container = msgContainerRef.current;
      if (hasNext && container.scrollTop === 0) {
        setPage((prev) => prev + 1);
      }
    };

    //최초 채팅 세팅
    const setupSocket = async () => {
      connectSocket(() => {
        // 개인 메세지 구독 (상대 -> 나)
        subscribe('/user/queue/private', (message) => {
          console.log('come');
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
  }, [hasNext]);

  useEffect(() => {
    // 최초 렌더링 시 스크롤 최하단 이동
    if (firstRenderRef.current && messages.length > 0) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
      firstRenderRef.current = false;
      return;
    }

    // messages 변경 시 스크롤 위치 계산
    if (msgContainerRef.current) {
      const container = msgContainerRef.current;
      if (receiveMsg.current) {
        receiveMsg.current = false;
      } else {
        const newScrollHeight = container.scrollHeight;
        const heightDiff = newScrollHeight - prevScrollHeight.current;
        console.log(newScrollHeight, prevScrollHeight.current, heightDiff);
        container.scrollTop = heightDiff;
      }
    }
  }, [messages]);

  // 페이지 변동 시 메세지 추가 fetch
  useEffect(() => {
    // 메세지 fetch
    const getMessages = () => {
      if (isLoading) return;
      if (!hasNext) return;

      setIsLoading(true);

      // fetch 시 스크롤 위치 기억 (마운트 시 fetch 제외)
      if (!firstRenderRef.current) {
        prevScrollHeight.current = msgContainerRef.current.scrollHeight;
      }

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
    getMessages();
  }, [page, hasNext, roomId]);

  const sendChatMessage = async () => {
    if (!msgInput) return;
    // if (!user) {
    //   alert('사용자 식별에 실패하였습니다. 다시 로그인해주세요.');
    //   navigate('/signin');
    // }
    const payload = {
      content: msgInput,
      senderId: user.chatSenderId,
      receiverId: chatInfo.partnerId,
      patientLogId: chatInfo.patientLogId,
    };
    const newMsg = {
      senderYn: true,
      content: msgInput,
      readYn: false,
    };
    setMsgInput('');
    startTransition(async () => {
      setOptMessages({ ...newMsg, isOpt: true });
      sendMessage('/app/private-message', payload);
      setMessages((prev) => [newMsg, ...prev]);
    });

    firstRenderRef.current = true;
  };

  const renderMessages = () =>
    optMessages
      .slice()
      .reverse()
      .map((msg, idx) => (
        <div key={idx} className={`flex ${msg.senderYn ? 'justify-end' : 'gap-3'}`}>
          {!msg.senderYn && (
            <img
              src={chatInfo.partnerImgAddress ? chatInfo.partnerImgAddress : defaultProfile}
              className='size-12'
            />
          )}
          <p
            className={`${
              msg.senderYn ? 'bg-[rgba(82,46,154,0.1)]' : 'bg-[var(--button-inactive)]'
            } ${msg.isOpt && 'opacity-50'} flex items-center rounded-2xl py-3 px-5`}
          >
            {msg.content}
          </p>
        </div>
      ));

  const exitChatRoom = () => {
    const confirmRes = confirm(
      '채팅방을 나갈 경우 지금까지의 대화가 완전히 삭제됩니다. 정말로 나가시겠습니까?',
    );
    if (confirmRes) {
      request('post', '/chat/out-room', { chatRoomId: chatInfo.chatRoomId })
        .then(() => {
          navigate('/chatrooms');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  // 해당 어르신 공고로 이동
  const gotoRecruit = () => {
    navigate('/center/recruit/detail');
  };

  // 해당 공고에 대해서 조율 완료 처리
  const tuningComplete = () => {
    const confirmRes = confirm('해당 어르신과의 조율을 완료 처리하시겠습니까?');
    if (confirmRes) {
      request('post', '/patient-match-status', {
        patientLogSeq: chatInfo.patientLogId,
        helperSeq: chatInfo.helperSeq,
        matchState: 'MATCH_FIN',
      })
        .then(() => {
          navigate('/chatrooms');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div className='flex flex-col'>
      <div
        className='flex flex-col gap-7 overflow-y-auto pb-3'
        style={{ height: 'calc(100vh - 78px - 60px)' }}
        ref={msgContainerRef}
      >
        {renderMessages()}
      </div>

      {/* 전송 바 */}
      {!isVisible && (
        <div className='fixed left-1/2 -translate-x-1/2 max-w-[591.35px] w-[88%] bottom-0 flex items-center gap-2.5 justify-between h-15 py-3 bg-white'>
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
            }}
          >
            전송
          </div>
        </div>
      )}

      {/* 하단 조정바 */}
      {isVisible && (
        <div className='absolute bottom-4 right-0 left-0 flex flex-col gap-3.5 px-5.5 max-w-2xl mx-auto'>
          <Button variant={'white'} className='w-full' onClick={tuningComplete}>
            조율 완료
          </Button>
          <div>
            <Button
              className='bg-[var(--button-inactive)] text-[var(--text)] w-full border-0 border-b rounded-none rounded-t-md'
              onClick={gotoRecruit}
            >
              해당 어르신 공고
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
