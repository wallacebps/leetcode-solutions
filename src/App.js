import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProblemList from './components/ProblemList';
import ProblemCreate from './components/ProblemCreate';
import Login from './components/Login';
import { useUser } from './context/UserContext';

const queryClient = new QueryClient();

function App() {
  const { user } = useUser();

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav className="p-4 bg-gray-800 text-white">
            <ul className="flex gap-4">
              <li>
                <a href="/problems" className="hover:underline">Problemas</a>
              </li>
              <li>
                <a href="/create" className="hover:underline">Criar Problema</a>
              </li>
              <li>
                <a href="/login" className="hover:underline">Login</a>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/problems"
              element={
                <ProtectedRoute>
                  <ProblemList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <ProblemCreate />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/problems" />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
