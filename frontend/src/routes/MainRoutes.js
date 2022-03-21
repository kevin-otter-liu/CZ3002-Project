import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTransaction = Loadable(lazy(() => import('views/utilities/Transaction')));
const UtilsBudget = Loadable(lazy(() => import('views/utilities/Budget')));
const UtilsProfile = Loadable(lazy(() => import('views/utilities/Profile')));
const UtilsTransactionForm = Loadable(lazy(() => import('views/utilities/TransactionForm')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [

        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/transaction',
            element: <UtilsTransaction />
        },
        {
            path: '/utils/budget',
            element: <UtilsBudget />
        },
        {
            path: '/utils/profile',
            element: <UtilsProfile />
        },
        {
            path: '/utils/transaction/form',
            element: <UtilsTransactionForm />
        }
    ]
};

export default MainRoutes;
