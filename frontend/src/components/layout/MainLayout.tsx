import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
}