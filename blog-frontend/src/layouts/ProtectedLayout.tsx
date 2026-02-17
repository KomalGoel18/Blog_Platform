import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';

export default function ProtectedLayout() {
  const { user } = useAuth();

  // Not logged in → kick out
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}
