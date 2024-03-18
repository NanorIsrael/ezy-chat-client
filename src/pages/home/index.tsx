import styles from './styles.module.css';
import { Socket } from 'socket.io-client'
import { redirect, useNavigate } from 'react-router-dom'; // Add this
import { useEffect } from 'react';


type HomeProps = {
	username: string
	room: string
	setRoom: (room: string) => void
	socket: Socket
}
function Home({ username, room, setRoom, socket }: HomeProps) {
	const navigate = useNavigate(); // Add this


	const joinRoom = () => {
		if (room !== '' && username !== '') {
			socket.emit('join_room', { username, room });
		}
		navigate('/chat', { replace: true }); // Add this

	};

	useEffect(() => {
		socket.on("userlogin", (data) => {
		  const { success, message } = data
		  console.log('-----pppppppp', success)
		  if (!success) {
			redirect('/')
		  }
		})
	  }, [socket])
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
			<h1>{`<>DevRooms</>`}</h1>

			<select
				className={styles.input}
				onChange={(e) => setRoom(e.target.value)}
			>
				<option>-- Select Room --</option>
				<option value='javascript'>JavaScript</option>
				<option value='node'>Node</option>
				<option value='express'>Express</option>
				<option value='react'>React</option>
			</select>
			<button
			className='btn btn-secondary'
			style={{ width: '100%' }}
			onClick={joinRoom}
			>
			Join Room
			</button>
			</div>
		</div>
	);
};

export default Home;