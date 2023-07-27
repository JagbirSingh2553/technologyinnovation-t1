

import Events from "../views/Events";
import NewsLetter from "../views/NewsLetter";
import EventDetails from "../views/EventDetails";
import CreateEvent from "../views/CreateEvent";
import Login from "../components/Login";
import Registration from "../components/Registration";
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import withAuthCheck from '../components/withAuthCheck'; 
import FeedbackForm from "../components/FeedbackForm";
const routes = [
  {
    path: "/",
    element: <Events />,
  },
  {
    name: "Home",
    path: "/home",
    element: <h1>Welcome!</h1>,
  },
  {
    name: "Events",
    path: "/events",
    element: <Events />,
  },
  {
    name: "Admin Login",
    path: "/admin/login",
    element: <AdminLogin />, 
  },
  {
    name: "Admin Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Events",
    path: "/events/:eventId",
    element: <EventDetails />,
  },
  {
    path: "/events/create",
    element: <CreateEvent />,
  },
  {
    name: "Newsletter",
    path: "/newsletter",

    element: <NewsLetter />
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Registration",
    path: "/registration",
    element: <Registration />,
  },
  {
    name: "Feedback",
    path: "/feedback",
    element: <FeedbackForm />,
  },
  {
    name: "Default",
    path: "/*",
    element: (
      <h1>
        Unable to handle request. Please use the app bar to navigate Home.
      </h1>
    ),
  },
];

export default routes;

