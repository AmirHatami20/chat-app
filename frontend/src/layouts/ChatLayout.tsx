import {Outlet, useNavigate} from "react-router-dom"
import {useGetMe} from "../queries/userQueries.ts";
import {useLogout} from "../queries/authQueries.ts";

export default function ChatLayout() {
    const {data: user} = useGetMe()
    const navigate = useNavigate();

    const {mutate, isPending} = useLogout()

    const handleLogout = () => {
        mutate(undefined)
        navigate("/auth/login")
    }

    const userAvatar = user?.avatar ? `http://localhost:5000/uploads/avatars/${user?.avatar}` : "https://i.pravatar.cc/100"

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-lg border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-indigo-600">My Chat App</h1>
                </div>
                <div className="p-6 border-b border-gray-200 flex items-center gap-4">
                    <img
                        src={userAvatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div className="flex-1">
                        <p className="font-semibold text-gray-800">{user?.username}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>

                        <span
                            className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                            {user?.isOnline ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>
                <button onClick={handleLogout} className="p-2 bg-red-400 rounded-lg cursor-pointer">
                    {isPending ? "..." : "Logout"}
                </button>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col">
                {/* Top bar */}
                <div className="h-16 bg-white shadow flex items-center px-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Chat Room</h2>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet/>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <form className="flex space-x-3">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 rounded-xl hover:bg-indigo-700 transition"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}