mern-portfolio-frontend/
│
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .env.example
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    │
    ├── api/
    │   └── api.js
    │
    ├── routes/
    │   └── PrivateRoute.jsx
    │
    ├── layouts/
    │   ├── PublicLayout.jsx
    │   └── AdminLayout.jsx
    │
    ├── shared/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── Sidebar.jsx        // Admin sidebar
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Services.jsx
    │   ├── Projects.jsx
    │   ├── ProjectDetails.jsx (optional)
    │   ├── Testimonials.jsx
    │   └── Contact.jsx        // Quote form
    │
    ├── admin/
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── Projects.jsx       // CRUD
    │   ├── AddProject.jsx
    │   ├── EditProject.jsx
    │   ├── Testimonials.jsx   // CRUD
    │   ├── AddTestimonial.jsx
    │   ├── EditTestimonial.jsx
    │   ├── Links.jsx          // Useful Links CRUD
    │   ├── AddLink.jsx
    │   └── EditLink.jsx
    │
    └── components/
        ├── ProjectCard.jsx
        ├── TestimonialCard.jsx
        └── ServiceCard.jsx


src/
│
├── api/
│   └── api.js
│
├── routes/
│   └── PrivateRoute.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Projects.jsx
│   ├── Testimonials.jsx
│   ├── Contact.jsx
│
│   ├── admin/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ManageProjects.jsx
│   │   ├── ManageTestimonials.jsx
│   │   └── ManageLinks.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── AdminSidebar.jsx
│
├── App.jsx
├── main.jsx
└── styles.css
