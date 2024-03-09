//Khởi tạo máy chủ Socket.IO trên cổng 8800 và thiết lập CORS để chỉ cho phép kết nối từ "http://localhost:3000".
 const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

//Mảng lưu trữ thông tin về các người dùng hiện đang kết nối
let activeUsers = []

//Kết nối client với server
io.on("connection", (socket) => {
    //add new user
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if(!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
            console.log("New User Connected", activeUsers)
        }
        // send all active users to new user
        io.emit("get-users", activeUsers)
    })

    //Client ngắt kết nối (Loại bỏ thông tin của user đã ngắt kết nối khỏi mảng activeUsers.)
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("User Disconnected", activeUsers)
        io.emit("get-users", activeUsers)
    })

    socket.on("send-message", (data) => {
        const {receiverId} = data
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("Sending from socket to :", receiverId)
        console.log("Data", data)
        if(user) {
            io.to(user.socketId).emit("receive-message", data)
        }
    })
})