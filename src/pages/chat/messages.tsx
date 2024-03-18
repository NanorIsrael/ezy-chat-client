import { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

import styles from './styles.module.css';

type Message = {
	message: string,
    username: string,
    __createdtime__: Date
}
const Messages = ({ socket }: {socket: Socket} ) => {
  const [messagesRecieved, setMessagesReceived] = useState< Message[]>([]);
  const messagesColumnRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    socket.on('receive_message', (data): void => {
      console.log('--kk---->', data);

      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        }
      ]  );
    });

	// Remove event listener on component unmount
    return () => {
		socket.off('receive_message')
	};
  }, [socket]);

  useEffect(() => {
//     // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages) => {
      console.log('Last 100 messages:', last100Messages);
//       // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });
    return () => {
		socket.off('last_100_messages')
	};
  }, [socket]);

  function sortMessagesByDate(messages: {__createdtime__: string} []) {
    return messages.sort(
      (b, a) => parseInt(b.__createdtime__) - parseInt(a.__createdtime__)
    );
  }
    // Scroll to the most recent message
	useEffect(() => {
		if (messagesColumnRef && messagesColumnRef.current) {
			messagesColumnRef.current.scrollTop =
			messagesColumnRef.current.scrollHeight;
		}
	  }, [messagesRecieved]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: Date) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  console.log('---------->', messagesRecieved)

  return (

    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;