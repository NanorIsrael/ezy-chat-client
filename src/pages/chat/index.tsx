import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage, { SendMessageProps } from './send-message';

const Chat = ({ socket, username, room }: SendMessageProps) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
		    <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;