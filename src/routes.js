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
import OnlineStore from './views/OnlineStore';
import BlogOverview from './views/BlogOverview';
import UserProfile from './views/UserProfile';
import UserProfileLite from './views/UserProfileLite';
import EditUserProfile from './views/EditUserProfile';
import Login from './views/Login';
import Register from './views/Register';
import RegisterInvite from './views/RegisterInvite';
import ForgotPassword from './views/ForgotPassword';
import ChangePassword from './views/ChangePassword';
import FileManagerList from './views/FileManagerList';
import FileManagerCards from './views/FileManagerCards';
import TransactionHistory from './views/TransactionHistory';
import Calendar from './views/Calendar';
import AddNewPost from './views/AddNewPost';
import Errors from './views/Errors';
import ComponentsOverview from './views/ComponentsOverview';
import Tables from './views/Tables';
import BlogPosts from './views/BlogPosts';
import HeaderNav from './views/HeaderNavigation';
import IconSidebarView from './views/IconSidebar';
import Logout from './views/Logout';
import PaymentSuccess from './views/PaymentSuccess';
import notFound from './views/notFound';

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
    path: '/ecommerce',
    layout: DefaultLayout,
    component: OnlineStore
  },
  {
    path: '/blog-overview',
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: '/user-profile',
    layout: DefaultLayout,
    component: UserProfile,
    needsAuth: true
  },
  {
    path: '/profile',
    layout: DefaultLayout,
    component: UserProfileLite,
    needsAuth: true
  },
  {
    path: '/edit-user-profile',
    layout: DefaultLayout,
    component: EditUserProfile,
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
    path: '/file-manager-list',
    layout: DefaultLayout,
    component: FileManagerList
  },
  {
    path: '/file-manager-cards',
    layout: DefaultLayout,
    component: FileManagerCards
  },
  {
    path: '/transaction-history',
    layout: DefaultLayout,
    component: TransactionHistory
  },
  {
    path: '/calendar',
    layout: DefaultLayout,
    component: Calendar
  },
  {
    path: '/add-new-post',
    layout: DefaultLayout,
    component: AddNewPost,
    needsAuth: true
  },
  {
    path: '/errors',
    layout: BlankIconSidebarLayout,
    component: Errors
  },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: '/tables',
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: '/blog-posts',
    layout: DefaultLayout,
    component: BlogPosts
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
];
