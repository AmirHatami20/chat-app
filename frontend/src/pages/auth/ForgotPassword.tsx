export default function ForgotPassword() {
    return (
        <form className="space-y-6">
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="w-full bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 transition">
                Send OTP
            </button>
        </form>
    );
}