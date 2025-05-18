import { type RouteObject, useRoutes } from 'react-router-dom';
import { Suspense, type ReactNode } from 'react';
import AppPage from './modules/index/AppPage';
import ConfirmEmail from './modules/auth/components/ConfirmEmail';
import ResetPassword from './modules/auth/components/ResetPassword';
import VerifyOTP from './modules/auth/components/VerifyOTP';
import BuyerDashboard from './modules/buyer/components/Dashboard';
import Chat from './modules/chat/components/Chat';
import Error from './modules/error/Error';
import AddGig from './modules/gigs/components/gig/AddGig';
import EditGig from './modules/gigs/components/gig/EditGig';
import Gigs from './modules/gigs/components/gigs/Gigs';
import GigView from './modules/gigs/components/view/GigView';
import Home from './modules/home/components/Home';
import GigInfoDisplay from './modules/index/gig-tabs/GigInfoDisplay';
import GigsIndexDisplay from './modules/index/gig-tabs/GigsIndexDisplay';
import Checkout from './modules/order/components/Checkout';
import Order from './modules/order/components/Order';
import Requirement from './modules/order/components/Requirement';
import ProtectedRoute from './modules/ProtectedRoute';
import AddSeller from './modules/sellers/components/add/AddSeller';
import ManageEarnings from './modules/sellers/components/dashboard/ManageEarnings';
import ManageOrders from './modules/sellers/components/dashboard/ManageOrders';
import Seller from './modules/sellers/components/dashboard/Seller';
import SellerDashboard from './modules/sellers/components/dashboard/SellerDashboard';
import CurrentSellerProfile from './modules/sellers/components/profile/CurrentSellerProfile';
import SellerProfile from './modules/sellers/components/profile/SellerProfile';
import Settings from './modules/settings/components/Settings';

function Layout({
  backgroundColor = '#fff',
  children,
}: {
  backgroundColor: string;
  children: ReactNode;
}) {
  return (
    <div style={{ backgroundColor }} className="flex flex-grow">
      {children}
    </div>
  );
}

export default function AppRouter() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />,
    },
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <ConfirmEmail />
        </Suspense>
      ),
    },
    {
      path: 'verify_otp',
      element: (
        <Suspense>
          <VerifyOTP />
        </Suspense>
      ),
    },
    {
      path: '/search/categories/:category',
      element: (
        <Suspense>
          <Layout backgroundColor="#ffffff">
            <GigsIndexDisplay type="categories" />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: '/gigs/search',
      element: (
        <Suspense>
          <Layout backgroundColor="#ffffff">
            <GigsIndexDisplay type="search" />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: '/gig/:gigId/:title',
      element: (
        <Suspense>
          <Layout backgroundColor="#ffffff">
            <GigInfoDisplay />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Home />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <BuyerDashboard />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/seller_onboarding',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <AddSeller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/seller_profile/:username/:sellerId/edit',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <CurrentSellerProfile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/seller_profile/:username/:sellerId/view',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <SellerProfile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/:username/:sellerId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Seller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: 'seller_dashboard',
          element: <SellerDashboard />,
        },
        {
          path: 'manage_orders',
          element: <ManageOrders />,
        },
        {
          path: 'manage_earnings',
          element: <ManageEarnings />,
        },
      ],
    },
    {
      path: '/manage_gigs/new/:sellerId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <AddGig />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/manage_gigs/edit/:gigId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <EditGig />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/gig/:username/:title/:sellerId/:gigId/view',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <GigView />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/categories/:category',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Gigs type="categories" />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/search/gigs',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Gigs type="search" />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/inbox',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Chat />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/inbox/:username/:conversationId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Chat />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/gig/checkout/:gigId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Checkout />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/gig/order/requirement/:gigId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Requirement />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/orders/:orderId/activities',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#f5f5f5">
              <Order />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/:username/edit',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#f5f5f5">
              <Settings />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <Suspense>
          <Error />
        </Suspense>
      ),
    },
  ];

  return useRoutes(routes);
}
