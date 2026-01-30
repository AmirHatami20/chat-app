import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useGetMe} from "../queries/userQueries";

const RootLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {data: user, isLoading, isError} = useGetMe();

    useEffect(() => {
        if (isLoading) return;

        const isAuthPage = location.pathname.startsWith("/auth");

        if (isError || !user) {
            if (!isAuthPage) {
                navigate("/auth/login", {replace: true});
            }
            return;
        }

        if (isAuthPage || location.pathname === "/") {
            navigate("/chat", {replace: true});
        }

    }, [isLoading, isError, user, navigate, location.pathname]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-300 animate-pulse"/>
        );
    }

    return <Outlet/>;
};

export default RootLayout;
