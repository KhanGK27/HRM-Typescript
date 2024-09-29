import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import styles from '../pages/style/AdminDashboard.module.css';
import employeeData from '../data/employeeData';

export default function AdminDashboard() {
    const router = useRouter();
    const [employees, setEmployees] = useState(employeeData);
    const [formData, setFormData] = useState({ name: '', position: '', leaveRequest: '', salary: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleLogout = () => {
        router.push('/login');
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (isEditing) {
            setEmployees(employees.map(emp => emp.id === currentId ? { id: currentId, ...formData } : emp));
            setIsEditing(false);
            setCurrentId(null);
        } else {
            const newEmployee = { id: Date.now(), ...formData };
            setEmployees([...employees, newEmployee]);
        }
        setFormData({ name: '', position: '', leaveRequest: '', salary: '' });
    };

    const handleEdit = (employee: { id: any; name: any; position: any; leaveRequest: any; salary: any; }) => {
        setFormData({ name: employee.name, position: employee.position, leaveRequest: employee.leaveRequest, salary: employee.salary });
        setIsEditing(true);
        setCurrentId(employee.id);
    };

    const handleDelete = (id: number) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    return (
        <Layout>
            <div className={styles.dashboardContainer}>

                <header className={styles.adminHeader}>
                    <h1>Giao diện Admin</h1>
                    <div className={styles.adminInfo}>
                        <p>Xin chào, Admin!</p>
                        <button className={styles.logoutButton} onClick={handleLogout}>Đăng xuất</button>
                    </div>
                </header>

                <form className={styles.employeeForm} onSubmit={handleSubmit}>
                    <h2>{isEditing ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h2>
                    <input type="text" name="name" placeholder="Họ và tên" value={formData.name} onChange={handleInputChange} required />
                    <input type="text" name="position" placeholder="Vị trí" value={formData.position} onChange={handleInputChange} required />
                    <input type="text" name="leaveRequest" placeholder="Yêu cầu nghỉ" value={formData.leaveRequest} onChange={handleInputChange} required />
                    <input type="text" name="salary" placeholder="Lương" value={formData.salary} onChange={handleInputChange} required />
                    <button type="submit">{isEditing ? 'Cập Nhật' : 'Thêm'}</button>
                </form>

                <div className={styles.mainContent}>
                    <h2>Quản lý nhân viên</h2>
                    <table className={styles.adminTable}>
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Vị trí</th>
                                <th>Yêu cầu nghỉ</th>
                                <th>Lương</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.leaveRequest}</td>
                                    <td>{employee.salary}</td>
                                    <td>
                                        <button className={styles.approveButton} onClick={() => handleEdit(employee)}>Sửa</button>
                                        <button className={styles.rejectButton} onClick={() => handleDelete(employee.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
