import Layout from '../components/layout';
import styles from './style/UserDashboard.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

const userInfoInitial = {
  name: "Nguyễn Duy Khang",
  position: "Nhân viên IT",
  email: "nguyenduykhang@gmail.com",
  salary: "10,000,000 VND"
};

export default function UserDashboard() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(userInfoInitial);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfoInitial);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(userInfo);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUserInfo(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log('Đăng xuất thành công!');

    router.push('/login'); 
  };

  return (
    <Layout>
      <div className={styles.userContainer}>
        <header className={styles.userHeader}>
          <h1>Giao Diện Người Dùng</h1>
          <div className={styles.userInfo}>
            <p>Xin chào, {userInfo.name}!</p>
            <button className={styles.logoutButton} onClick={handleLogout}>Đăng xuất</button>
          </div>
        </header>

        <div className={styles.mainContent}>
          <h2>Thông Tin Nhân Viên</h2>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Vị trí</th>
                <th>Lương</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userInfo.name}</td>
                <td>{userInfo.position}</td>
                <td>{userInfo.salary}</td>
              </tr>
            </tbody>
          </table>
          <button className={styles.editButton} onClick={handleEdit}>
            Sửa Thông Tin
          </button>

          {isEditing && (
            <div className={styles.employeeForm}>
              <h3>Sửa Thông Tin Cá Nhân</h3>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="position"
                placeholder="Vị trí"
                value={formData.position}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="salary"
                placeholder="Lương"
                value={formData.salary}
                onChange={handleChange}
              />
              <button onClick={handleSave}>
                Lưu Thay Đổi
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
