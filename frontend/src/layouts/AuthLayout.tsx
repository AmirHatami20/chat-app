import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600">
            <div className="bg-white shadow-2xl rounded-3xl p-10 sm:p-12 w-full max-w-md animate-fade-in">
                <Outlet/>
            </div>
        </div>
    );
};

export default AuthLayout;
