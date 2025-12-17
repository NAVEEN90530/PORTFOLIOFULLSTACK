import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminSidebar";
import About from "../pages/About";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";
import CategoryCrudPage from "../pages/admin/ManageCategory";
import ManageContact from "../pages/admin/ManageContact";
import ManageLinks from "../pages/admin/ManageLinks";
import ManageProjects from "../pages/admin/ManageProjects";
import ManageStats from "../pages/admin/ManageStats";
import ManageTestimonials from "../pages/admin/ManageTestimonials";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import PrivateRoute from "../routes/PrivateRoute";
import Footer from "../components/Footer";
import NotFound from "../pages/NotFound";
import Process from "../pages/Process";
import Contact from "../pages/Contact";
import AppNavbar from "../components/AppNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageDomain from "../pages/admin/ManageDomain";
import { Container } from "react-bootstrap";

// Admin Layout (Reusable)
const AdminLayout = ({ children }) => (
  <>
    <AdminNavbar />
    <div className="admin-content">{children}</div>
  </>
);

function App() {
  return (
    <BrowserRouter>
      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // closes after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><AppNavbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><AppNavbar /><About /><Footer /></>} />
        <Route path="/services" element={<><AppNavbar /><Services /><Footer /></>} />
        <Route path="/projects" element={<><AppNavbar /><Projects /><Footer /></>} />
        <Route path="/process" element={<><AppNavbar /><Process /><Footer /></>} />
        <Route path="/get-in-touch" element={<><AppNavbar /><Contact /><Footer /></>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ManageProjects />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ManageTestimonials />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ManageContact />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/links"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ManageLinks />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/stats"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ManageStats />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <PrivateRoute>
              <AdminLayout>
                <CategoryCrudPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/domain"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ManageDomain />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
