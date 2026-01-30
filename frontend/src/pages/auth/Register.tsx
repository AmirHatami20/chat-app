import {useState, type ChangeEvent} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useRegister} from "../../queries/authQueries";

const Register = () => {
    const navigate = useNavigate();
    const {mutate, isPending, error} = useRegister();

    const [data, setData] = useState({
        username: "",
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
                navigate("/auth/login");
            },
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Create Account
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    name="username"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    placeholder="Username"
                    value={data.username}
                    onChange={handleInputChange}
                    required
                />

                <input
                    name="email"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                />

                <input
                    name="password"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    placeholder="Password"
                    type="password"
                    value={data.password}
                    onChange={handleInputChange}
                    required
                />

                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Creating account..." : "Register"}
                </button>

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        Registration failed. Try again.
                    </p>
                )}
            </form>

            <p className="mt-6 text-center text-gray-600">
                Already have an account?{" "}
                <Link className="text-blue-500 font-medium hover:underline" to="/auth/login">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
