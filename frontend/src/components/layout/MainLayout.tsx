import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Dashboard />
    </div>
  );
}