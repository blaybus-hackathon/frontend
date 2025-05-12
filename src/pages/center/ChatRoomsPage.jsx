import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/custom/input';
import { request } from '@/api';

import searchImg from '@/assets/images/search.png';
import { useNavigate } from 'react-router-dom';

const DUMMYLIST = [
  {
    chatRoomId: 2,
    partnerId: 2,
    partnerName: '김요양 요양보호사',
    patientLogId: 1,
    patientLogName: '어르신2',
  },
  {
    chatRoomId: 3,
    partnerId: 1,
    partnerName: '김민수 요양보호사',
    patientLogId: 1,
    patientLogName: '어르신2',
  },
  {
    chatRoomId: 1,
    partnerId: 3,
    partnerName: '밍밍밍 요양보호사',
    patientLogId: 3,
    patientLogName: '어르신3',
  },
];
const DUMMYNEGOBOOL = true;

function ChatRoomsPage() {
  const [chatRoomList, setChatRoomList] = useState(DUMMYLIST);
  const [firstChats, setFirstChats] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getChatRooms();
  }, []);

  const navigate = useNavigate();

  const getChatRooms = () => {
    request('get', '/chat/find-list')
      // request('get', '/sign/token/refresh-token')
      .then((res) => {
        console.log(res);
        setChatRoomList(res);
      })
      .catch(() => {
        console.error('Cant render chat list');
      });
  };

  const renderChatRooms = () =>
    chatRoomList
      .filter((x) => x.partnerName.includes(searchQuery))
      .map((chatRoom) => (
        <div
          key={chatRoom.chatRoomId}
          className='py-6 flex relative'
          onClick={() => {
            gotoChatRoom(chatRoom.chatRoomId);
          }}
        >
          <div>
            <div className='rounded-[50%] bg-[var(--button-inactive)] size-15 mr-3.5'></div>
          </div>
          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-lg'>
              {chatRoom.partnerName}
              {DUMMYNEGOBOOL && (
                <span className='font-normal text-[var(--main)] ml-3'>조율 완료</span>
              )}
            </p>
            <p className='text-start'>Last Content...</p>
          </div>
          <span className='bg-[var(--main)] rounded-[50%] size-5.5 text-white absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-sm'>
            3
          </span>
        </div>
      ));

  const gotoChatRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div className='max-w-md mx-auto p-6'>
      <div className='mb-4.5'>
        <div className='font-semibold text-2xl text-start mb-3'>채팅</div>
        <p className='text-start'>매칭 요청을 보낸 요양 보호사와 채팅을 할 수 있어요!</p>
      </div>

      <div className='mb-11'>
        <Input
          width='100%'
          placeholder='검색'
          label={<img src={searchImg} className='size-6' />}
          className='h-13 rounded-lg bg-[var(--button-inactive)] text-xl pl-13'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      <div>{renderChatRooms()}</div>
      <footer></footer>
    </div>
  );
}

export default ChatRoomsPage;
