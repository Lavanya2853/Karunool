# PLAN: KaruNool Initial Implementation (Vertical Slices)

## 🎯 Overview
This plan focuses on building the **KaruNool** platform using a vertical slice approach. We will build the "Artisan Profile" feature from the database to the UI first, allowing for rapid feedback and design iteration.

## 🏗️ Project Type: WEB
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Java Spring Boot (Maven)
- **Database:** MySQL
- **Auth:** JWT

## 🏆 Success Criteria
- [ ] Backend: Functional REST API for Artisan profiles.
- [ ] Frontend: "Premium" quality Artisan Profile page (Aesthetic, Responsive).
- [ ] Database: Relational schema for Users, Artisans, and Crafts.
- [ ] Authentication: Working login/signup for Artisans.

## 🛠️ Tech Stack Rationale
- **Spring Boot:** Enterprise-grade reliability for handling relational data and security.
- **React + Vite:** Ultra-fast development and modern ecosystem.
- **Tailwind CSS:** Essential for achieving the "Premium/WOW" design requirement with custom spacing and typography.
- **Railway/Render:** Recommended for deployment due to built-in MySQL support and easy CI/CD.

## 📂 Proposed File Structure
```text
D:\Karunool\
├── karunool-backend/        # Spring Boot Project
├── karunool-frontend/       # React (Vite) Project
├── docs/                    # Documentation
└── .agent/                  # Agent Configuration
```

---

## 📅 Task Breakdown

### Phase 1: Foundation (P0)
| ID | Task | Agent | Skills | Priority | Dependencies |
|----|------|-------|--------|----------|--------------|
| 1.1 | Initialize Spring Boot Project | `backend-specialist` | `python-patterns` (logic match) | P0 | None |
| 1.2 | Initialize React Project (Vite) | `frontend-specialist` | `frontend-design` | P0 | None |
| 1.3 | Database Setup (MySQL) | `database-architect` | `database-design` | P0 | None |

### Phase 2: Vertical Slice - Artisan Profile (P1)
| ID | Task | Agent | Skills | Priority | Dependencies |
|----|------|-------|--------|----------|--------------|
| 2.1 | Create Artisan & User Entity Models | `backend-specialist` | `api-patterns` | P1 | 1.1, 1.3 |
| 2.2 | Develop Artisan Profile REST API (CRUD) | `backend-specialist` | `api-patterns` | P1 | 2.1 |
| 2.3 | Design & Build Artisan Profile UI | `frontend-specialist` | `frontend-design` | P1 | 1.2 |
| 2.4 | Connect Frontend to Backend API | `frontend-specialist` | `clean-code` | P1 | 2.2, 2.3 |

### Phase 3: Identity & Security (P1)
| ID | Task | Agent | Skills | Priority | Dependencies |
|----|------|-------|--------|----------|--------------|
| 3.1 | Implement JWT Authentication | `backend-specialist` | `api-patterns` | P1 | 2.1 |
| 3.2 | Login & Registration UI | `frontend-specialist` | `frontend-design` | P1 | 3.1 |

---

## 🔍 Phase X: Verification Checklist
- [ ] **Security:** `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .`
- [ ] **UI Audit:** `python .agent/skills/frontend-design/scripts/ux_audit.py .`
- [ ] **Build:** `npm run build` (Frontend) & `./mvnw package` (Backend)
- [ ] **Visuals:** No default Bootstrap colors; use high-end Tailwind palette.
- [ ] **Socratic Check:** All user constraints (Solo dev, Vertical slices) respected.

## ✅ PHASE X COMPLETE
- Status: ⏳ Planning
- Date: 2026-04-22
