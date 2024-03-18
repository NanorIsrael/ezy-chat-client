import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Add this
import { Socket, io } from 'socket.io-client';

// const socket = io('http://localhost:4000')

function Login({ setUsername }: { setUsername: (name: string) => void}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate(); // Add this


	const login = () => {
		if (email !== '' && password !== '') {
		  fetch('http://localhost:4000/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email, 
				password: password
			})
		})
		  .then(res => res.json())
		  .then(res => {
			if (res.token) {
				localStorage.setItem('authToken', res.token)
				setUsername(res.email);
				console.log('----->clikced to logged', res)
				  navigate('/', { replace: true });
			}
			
			}
		  )
		  .catch(error => console.log(error))

			// socket.emit('register', {
			// 	username: email, password
			// })
		}

	};

	// useEffect(() => {
	// 	socket.on('registrationSuccess', (data) => {
	// 		const { username, token } = data;
	// 		localStorage.setItem('authToken', token)
	// 		setUsername(username);
	// 		navigate('/', { replace: true });
	// 	})
	// 	socket.on('unauthorized', ({message}) => console.log(message))
	// 	socket.on('registrationFailure', ({message}) => console.log(message))
	// }, [navigate, setUsername]);

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
			<h1>{`<>DevRooms</>`}</h1>

			<input
				className={styles.input}
				placeholder='Email...'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				className={styles.input}
				placeholder='Password...'
				onChange={(e) => setPassword(e.target.value)}
			/>

			
			<button
			className='btn btn-secondary'
			style={{ width: '100%' }}
			onClick={login}
			>
			Login
			</button>
			</div>
		</div>
	);
};

export default Login;