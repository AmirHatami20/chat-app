import {type ChangeEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useLogin} from "../../queries/authQueries";

const Login = () => {
    const navigate = useNavigate();
    const {mutate, isPending, error} = useLogin();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate(data, {
            onSuccess: () => {
                navigate("/");
            },
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Welcome Back
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    name="email"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                />

                <input
                    name="password"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Password"
                    type="password"
                    value={data.password}
                    onChange={handleInputChange}
                    required
                />

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        Login failed. Check your credentials.
                    </p>
                )}
            </form>

            <p className="mt-6 text-center text-gray-600">
                Don't have an account?{" "}
                <Link className="text-blue-500 font-medium hover:underline" to="/auth/register">
                    Register
                </Link>
            </p>

            <p className="mt-2 text-center">
                <Link className="text-sm text-gray-500 hover:underline" to="/auth/forgot-password">
                    Forgot password?
                </Link>
            </p>
        </div>
    );
};

export default Login;
