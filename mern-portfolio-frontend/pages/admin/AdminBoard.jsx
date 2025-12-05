import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import Dashboard from './Dashboard'
import Login from './Login'
import ManageLinks from './ManageLinks'
import ManageProjects from './ManageProjects'
import ManageTestimonials from './ManageTestimonials'
import ManageStats from './ManageStats'
import ManageCatagery from './ManageCategory'
import ManageContact from './ManageContact'


function AdminBoard() {
  return (
    <div>

      <AdminSidebar />

      <>
        <Dashboard />
        <ManageCatagery />
        <ManageProjects />
        <ManageTestimonials />
        <ManageStats />
        <ManageContact />
      </>
    </div>
  )
}

export default AdminBoard
