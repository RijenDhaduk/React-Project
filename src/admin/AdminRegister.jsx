import { Link } from "react-router-dom";
const AdminRegister = () => {
    return (
        <center>
            <h2>Admin Register Page</h2>
            <table border={1}>
                <tr>
                    <td>Name :- </td>
                    <td><input type="text" name="name"/></td>
                </tr>
                <tr>
                    <td>Email :- </td>
                    <td><input type="text" name="email"/></td>
                </tr>
                <tr>
                    <td>Password :- </td>
                    <td><input type="text" name="password"/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="button" value="submit"/></td>
                </tr>
            </table>
            <Link to='/admin'>Login</Link>
        </center>
    )
}
export default AdminRegister;