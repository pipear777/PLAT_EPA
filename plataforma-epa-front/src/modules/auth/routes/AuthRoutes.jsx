import { authRoutesList } from '@/routes';
import {
  LoginPage,
  RecoverPasswordPage,
  ResetPasswordPage,
  VerifyCodePage,
} from '../pages';

export const AuthRoutes = [
  { path: authRoutesList.login, element: <LoginPage /> },
  { path: authRoutesList.initiate, element: <RecoverPasswordPage /> },
  { path: authRoutesList.code, element: <VerifyCodePage /> },
  { path: authRoutesList.reset, element: <ResetPasswordPage /> },
];
