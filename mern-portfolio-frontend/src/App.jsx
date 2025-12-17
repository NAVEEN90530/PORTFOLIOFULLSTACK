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
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import PrivateRoute from "../routes/PrivateRoute";
import Footer from "../components/Footer";
import NotFound from "../pages/NotFound";
import Process, { DesignStages } from "../pages/Process";
import Contact from "../pages/Contact";
import AppNavbar from "../components/AppNavbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageDomain from "../pages/admin/ManageDomain";


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
        {/* Public */}
        <Route path="/" element={<><AppNavbar /><Home /></>} />
        <Route path="/about" element={<><AppNavbar /><About /></>} />
        <Route path="/services" element={<><AppNavbar /><Services /></>} />
        <Route path="/projects" element={<><AppNavbar /><Projects /></>} />
        <Route path="/process" element={<><AppNavbar /><Process /><DesignStages /></>} />
        <Route path="/touch" element={<><AppNavbar /><Contact /></>} />

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminNavbar /><Dashboard /></PrivateRoute>} />
        <Route path="/admin/projects" element={<PrivateRoute><AdminNavbar /><ManageProjects /></PrivateRoute>} />
        <Route path="/admin/testimonials" element={<PrivateRoute><AdminNavbar /><ManageTestimonials /></PrivateRoute>} />
        <Route path="/admin/contacts" element={<PrivateRoute><AdminNavbar /><ManageContact /></PrivateRoute>} />
        <Route path="/admin/links" element={<PrivateRoute><AdminNavbar /><ManageLinks /></PrivateRoute>} />
        <Route path="/admin/adminpage" element={<PrivateRoute><AdminNavbar /><AdminBoard /></PrivateRoute>} />
        <Route path="/admin/stats" element={<PrivateRoute><AdminNavbar /><ManageStats /></PrivateRoute>} />
        <Route path="/admin/category" element={<PrivateRoute><AdminNavbar /><CategoryCrudPage /></PrivateRoute>} />
        <Route path="/admin/domain" element={<PrivateRoute><AdminNavbar /><ManageDomain /></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}


export default App;