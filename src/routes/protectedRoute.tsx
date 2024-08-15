import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/auth";

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { signed } = useContext(AuthContext);

    if (!signed) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;