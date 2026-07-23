# Smart Growth Dashboard

A personalized self-improvement tracking application that allows users to monitor their personal evolution through real-time metrics and dynamic data visualization. Built using a modern decoupled architecture, it offers secure, user-specific views for goals, habits, and skills.

##  Tech Stack

- **Frontend:** Nuxt (Vue.js), Tailwind CSS, Axios/Fetch API
- **Backend/CMS:** Strapi v4 (Node.js), Users & Permissions Plugin
- **Database:** Relational (MySQL / PostgreSQL / SQLite)

---

##  System Architecture & Data Model

The application uses an isolated data structure mapping all features back to Strapi's native `User` collection type via a **Many-to-One** relationship:

- **User**: System core credentials (`username`, `email`, `password`). Has many Goals, Habits, and Skills.
- **Goal**: Contains `title`, `description`, `progress`, `deadline`, `status_goal`, and the relational link `user`.
- **Habit**: Tracks daily routines with `name`, `streak`, `completed`, and the relational link `user`.
- **Skill**: Monitors proficiency using `name`, `level`, and the relational link `user`.

---

##  Installation & Setup

### 1. Backend Setup (Strapi)
Clone the repository and navigate to the backend folder:
```bash
cd backend
npm install
npm run develop

###2. Frontend Setup (Nuxt)
cd frontend
npm install
npm run dev
