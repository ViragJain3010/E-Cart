import AdminNavbar from "../../Feature/Admin/AdminNavbar"
import AdminOrders from "../../Feature/Admin/AdminOrders"

const AdminOrdersPage = () => {
    return (
        <div>
            <AdminNavbar >
                <AdminOrders />
            </AdminNavbar>
        </div>
    )
}

export default AdminOrdersPage