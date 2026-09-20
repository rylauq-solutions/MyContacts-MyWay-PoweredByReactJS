import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import AddContact from '../pages/addcontacts/AddContacts';
import Layout from '../pages/Layout';
import EditContact from '../pages/editcontacts/EditContacts';

export const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/add",
                element: <AddContact />
            },
            {
                path: "/edit/:id",
                element: <EditContact />
            }
        ]
    }
]);