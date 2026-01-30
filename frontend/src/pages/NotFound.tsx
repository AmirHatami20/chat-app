import {Link} from "react-router-dom"

export default function NotFound() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white px-4">
            <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
            <h2 className="text-3xl mt-4 font-bold">Oops! Page not found</h2>
            <p className="mt-2 text-lg text-gray-200">
                The page you are looking for does not exist.
            </p>
            <Link
                to="/auth/login"
                className="mt-6 inline-block bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform"
            >
                Go Back Home
            </Link>
        </div>
    );
}