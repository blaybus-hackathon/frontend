import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/custom/input';
import { request } from '@/api';
import chatStore from '@/store/jbStore/chatStore';

import searchImg from '@/assets/images/search.png';
import { useNavigate } from 'react-router-dom';

const DUMMYNEGOBOOL = true;

function ChatRoomsPage() {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { setChatInfo } = chatStore();

  useEffect(() => {
    getChatRooms();
  }, []);

  const navigate = useNavigate();

  const getChatRooms = () => {
    request('get', '/chat/find-list')
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
            setChatInfo(chatRoom);
            gotoChatRoom(chatRoom.chatRoomId);
          }}
        >
          <div>
            <img
              src={chatRoom.partnerImgAddress}
              className='rounded-[50%] bg-[var(--button-inactive)] size-15 mr-3.5'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-lg'>
              {chatRoom.partnerName}
              {DUMMYNEGOBOOL && (
                <span className='font-normal text-[var(--main)] ml-3'>조율 완료</span>
              )}
            </p>
            {chatRoom.lastChatContent && <p className='text-start'>{chatRoom.lastChatContent}</p>}
          </div>
          {chatRoom.notReadCnt !== 0 && (
            <span className='bg-[var(--main)] rounded-[50%] size-5.5 text-white absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-sm'>
              {chatRoom.notReadCnt}
            </span>
          )}
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
