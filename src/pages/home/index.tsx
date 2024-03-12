import styles from './styles.module.css';
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'; // Add this


type HomeProps = {
	username: string
	setUsername: (name: string) => void
	room: string
	setRoom: (room: string) => void
	socket: Socket
}
function Home({ username, setUsername, room, setRoom, socket }: HomeProps) {
	const navigate = useNavigate(); // Add this

	const joinRoom = () => {
		if (room !== '' && username !== '') {
		  socket.emit('join_room', { username, room });
		}

		navigate('/chat', { replace: true }); // Add this
	};
	return (
		<div className={styles.container}>
		<input
			className={styles.input}
			placeholder='Username...'
			onChange={(e) => setUsername(e.target.value)} // Add this
		/>

		<select
			className={styles.input}
			onChange={(e) => setRoom(e.target.value)} // Add this
		>
		</select>
		<button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom} // Add this
        >
          Join Room
        </button>
		</div>
	);
};

export default Home;