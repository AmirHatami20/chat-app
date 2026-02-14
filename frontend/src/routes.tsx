import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import ChatLayout from "./layouts/ChatLayout";
import ChatHome from "./pages/chat/Home";
import ChatRoom from "./pages/chat/Room";
import NotFound from "./pages/NotFound";

export const appRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },
      {
        path: "chat",
        element: <ChatLayout />,
        children: [
          { path: "", element: <ChatHome /> },
          { path: ":userId", element: <ChatRoom /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
