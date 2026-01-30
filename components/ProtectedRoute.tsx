import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];  // Optional: if not provided, any authenticated user can access
    redirectTo?: string;    // Where to redirect if not authorized
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles,
    redirectTo = '/login'
}) => {
    const { isAuthenticated, loading, userData } = useAuth();
    const location = useLocation();

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#2A1617] flex justify-center items-center">
                <p className="text-[#FE7F42] font-bold animate-pulse">Loading...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access if allowedRoles is specified
    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = userData?.role as Role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            // User doesn't have required role
            // Redirect to appropriate page based on their actual role
            const roleRedirects: Record<string, string> = {
                [Role.BUYER]: '/buyer',
                [Role.SELLER]: '/seller',
                [Role.ADMIN]: '/admin',
                [Role.GUEST]: '/',
            };

            const redirectPath = userRole ? roleRedirects[userRole] : redirectTo;
            return <Navigate to={redirectPath} replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
