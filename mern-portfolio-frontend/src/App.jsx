import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminSidebar";
import About from "../pages/About";
import AdminBoard from "../pages/admin/AdminBoard";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";
import CategoryCrudPage from "../pages/admin/ManageCategory";
import ManageContact from "../pages/admin/ManageContact";
import ManageLinks from "../pages/admin/ManageLinks";
import ManageProjects from "../pages/admin/ManageProjects";
import ManageStats from "../pages/admin/ManageStats";
import ManageTestimonials from "../pages/admin/ManageTestimonials";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import Testimonials from "../pages/Testimonials";
import PrivateRoute from "../routes/PrivateRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFound from "../pages/NotFound";


function App() {
  return (
    <BrowserRouter>
      {/* Conditionally render the navbar */}
      <Navbar />
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/touch" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute>
            <AdminNavbar />
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/admin/projects" element={
          <PrivateRoute>
            <AdminNavbar />
            <ManageProjects />
          </PrivateRoute>
        } />

        <Route path="/admin/testimonials" element={
          <PrivateRoute>
            <AdminNavbar />
            <ManageTestimonials />
          </PrivateRoute>
        } />

        <Route path="/admin/contacts" element={
          <PrivateRoute>
            <AdminNavbar />
            <ManageContact />
          </PrivateRoute>
        } />

        <Route path="/admin/links" element={
          <PrivateRoute>
            <AdminNavbar />
            <ManageLinks />
          </PrivateRoute>
        } />

        <Route path="/admin/adminpage" element={
          <PrivateRoute>
            <AdminNavbar />
            <AdminBoard />
          </PrivateRoute>
        } />

        <Route path="/admin/stats" element={
          <PrivateRoute>
            <AdminNavbar />
            <ManageStats />
          </PrivateRoute>
        } />

        <Route path="/admin/category" element={
          <PrivateRoute>
            <AdminNavbar />
            <CategoryCrudPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />  {/* This will catch all unmatched routes */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;