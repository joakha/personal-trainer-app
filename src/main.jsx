import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerList from './components/CustomerList.jsx'
import TrainingsList from './components/TrainingsList.jsx'
import TrainingsCalendar from './components/TrainingsCalendar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <CustomerList />,
        index: true
      },
      {
        path: "TrainingsList",
        element: <TrainingsList />,
      },
      {
        path: "TrainingsCalendar",
        element: <TrainingsCalendar />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
