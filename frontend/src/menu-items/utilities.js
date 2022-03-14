// assets
//import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// constant
const icons = {
    PaymentIcon,
    PermIdentityOutlinedIcon,
    AccountBalanceWalletIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-transaction',
            title: 'Transaction',
            type: 'item',
            url: '/utils/transaction',
            icon: icons.PaymentIcon,
            breadcrumbs: false
        },
        {
            id: 'util-budget',
            title: 'Budget',
            type: 'item',
            url: '/utils/budget',
            icon: icons.AccountBalanceWalletIcon,
            breadcrumbs: false
        },
        {
            id: 'util-profile',
            title: 'Profile',
            type: 'item',
            url: '/utils/profile',
            icon: icons.PermIdentityOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default utilities;
