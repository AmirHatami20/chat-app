export default function Home() {
    const users = [
        { id: "1", name: "Admin", online: true },
        { id: "2", name: "User 1", online: false },
    ];

    return (
        <div className="flex flex-col h-full">
            <h2 className="p-4 text-lg font-bold border-b">Chats</h2>
            <ul className="flex-1 overflow-y-auto">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="p-4 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    >
                        <span>{user.name}</span>
                        {user.online && <span className="w-3 h-3 bg-green-500 rounded-full" />}
                    </li>
                ))}
            </ul>
        </div>
    );
}