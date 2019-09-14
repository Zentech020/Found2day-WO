import React from 'react';
import { Redirect } from 'react-router-dom';

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar } from './layouts';

// Route Views
import Analytics from './views/Analytics';
import Applicants from './views/Applicants';
import Vacancies from './views/Vacancies';
import SingleVacancy from './views/SingleVacancy';
import AddVacancy from './views/AddVacancy';
import EditVacancy from './views/EditVacancy';
import Billing from './views/Billing';
import Help from './views/Help';
import UserProfileLite from './views/UserProfileLite';
import Login from './views/Login';
import Register from './views/Register';
import RegisterInvite from './views/RegisterInvite';
import ForgotPassword from './views/ForgotPassword';
import ChangePassword from './views/ChangePassword';
import HeaderNav from './views/HeaderNavigation';
import IconSidebarView from './views/IconSidebar';
import Logout from './views/Logout';
import PaymentSuccess from './views/PaymentSuccess';
import verifyAccountPage from './views/verifyAccount';

const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);

const emptyLayout = ({ children }) => (
  <div className="d-flex align-items-center" style={{ height: '100vh' }}>
    {children}
  </div>
);

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/analytics" />
  },
  {
    path: '/analytics',
    layout: DefaultLayout,
    component: Analytics,
    needsAuth: true
  },
  {
    path: '/applicants',
    layout: DefaultLayout,
    component: Applicants,
    needsAuth: true
  },
  {
    path: '/vacancies',
    layout: DefaultLayout,
    component: Vacancies,
    needsAuth: true
  },
  {
    path: '/vacancy/:id',
    layout: DefaultLayout,
    component: SingleVacancy,
    needsAuth: true
  },
  {
    path: '/add-vacancy',
    layout: DefaultLayout,
    component: AddVacancy,
    needsAuth: true
  },
  {
    path: '/edit-vacancy/:id',
    layout: DefaultLayout,
    component: EditVacancy,
    needsAuth: true
  },
  {
    path: '/billing',
    layout: DefaultLayout,
    component: Billing,
    needsAuth: true
  },
  {
    path: '/help',
    layout: DefaultLayout,
    component: Help,
    needsAuth: true
  },

  {
    path: '/profile',
    layout: DefaultLayout,
    component: UserProfileLite,
    needsAuth: true
  },
  {
    path: '/login',
    layout: emptyLayout,
    component: Login,
    needsAuth: false
  },
  {
    path: '/register',
    layout: emptyLayout,
    component: Register,
    needsAuth: false
  },
  {
    path: '/registration/invitation/group/:groupId/invitationToken/:token',
    layout: emptyLayout,
    component: RegisterInvite,
    needsAuth: false
  },
  {
    path: '/forgot-password',
    layout: emptyLayout,
    component: ForgotPassword,
    needsAuth: false
  },
  {
    path: '/change-password/:id/:token',
    layout: emptyLayout,
    component: ChangePassword,
    needsAuth: false
  },
  {
    path: '/header-navigation',
    layout: HeaderNavigation,
    component: HeaderNav
  },
  {
    path: '/icon-sidebar-nav',
    layout: IconSidebar,
    component: IconSidebarView
  },
  {
    path: '/logout',
    layout: IconSidebar,
    component: Logout
  },
  {
    path: '/payment-success',
    layout: DefaultLayout,
    component: PaymentSuccess,
    needsAuth: true
  },
  {
    path: '/verify/:verifyToken/:userId',
    layout: emptyLayout,
    component: verifyAccountPage,
    needsAuth: false
  },
];
