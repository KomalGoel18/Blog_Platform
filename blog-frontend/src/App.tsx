import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedLayout from './layouts/ProtectedLayout';

import DashboardPage from './pages/DashboardPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PostFormPage } from './pages/PostFormPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* PROTECTED APP */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/posts" element={<BlogListingPage />} />
          <Route path="/posts/:id" element={<BlogPostPage />} />
          <Route path="/create" element={<PostFormPage />} />
          <Route path="/edit/:id" element={<PostFormPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
