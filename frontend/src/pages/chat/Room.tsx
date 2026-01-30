export default function Room() {
    const messages = [
        {id: 1, text: "Hello!", sender: "user", me: false},
        {id: 2, text: "Hi there!", sender: "admin", me: true},
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-3 rounded-xl max-w-xs ${
                            msg.me ? "bg-indigo-600 text-white ml-auto" : "bg-white text-gray-800"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

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
        </div>
    );
}