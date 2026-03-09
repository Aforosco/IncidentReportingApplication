import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import UserDashboard from "../components/UserDashboard.vue";
const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
        path: "/admin-dashboard",
        component: AdminDashboard,
        meta: { requiresAuth: true, role: "Admin" },
    },
    {
        path: "/user-dashboard",
        component: UserDashboard,
        meta: { requiresAuth: true, role: "User" },
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Navigation guard
router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // If trying to access login/register and already logged in
    if ((to.path === "/login" || to.path === "/register") && token) {
        if (role === "Admin") {
            next("/admin-dashboard");
        }
        else {
            next("/user-dashboard");
        }
        return;
    }
    // If route requires authentication
    if (to.meta.requiresAuth && !token) {
        next("/login");
        return;
    }
    // If route requires specific role and user doesn't have it
    if (to.meta.role && role && role !== to.meta.role) {
        // Redirect to correct dashboard based on their actual role
        if (role === "Admin") {
            next("/admin-dashboard");
        }
        else if (role === "User") {
            next("/user-dashboard");
        }
        else {
            // If role is invalid, logout and redirect to login
            localStorage.clear();
            next("/login");
        }
        return;
    }
    next();
});
export default router;
