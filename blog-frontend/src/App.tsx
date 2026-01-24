import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';

import DashboardPage from './pages/DashboardPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PostFormPage } from './pages/PostFormPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Posts */}
        <Route path="/posts" element={<BlogListingPage />} />
        <Route path="/posts/:id" element={<BlogPostPage />} />

        {/* Create / Edit */}
        <Route path="/create" element={<PostFormPage />} />
        <Route path="/edit/:id" element={<PostFormPage />} />

        {/* Extra Pages */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
