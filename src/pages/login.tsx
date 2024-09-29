import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style/Login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const adminAccount = { username: 'admin', password: 'admin123' };
        const userAccount = { username: 'user', password: 'user123' };

        if (username === adminAccount.username && password === adminAccount.password) {
            router.push('/admin');
        } else if (username === userAccount.username && password === userAccount.password) {
            router.push('/user');
            alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    );
}
