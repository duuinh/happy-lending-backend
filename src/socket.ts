let connection: any = null;

export class Socket {
  socket: any;
  
  constructor() {
    this.socket = null;
  }
  connect(server: any) {
    const io = require("socket.io")(server, {cors: true});
    io.on("connection", (socket: any) => {
       this.socket = socket;
       console.log('socket: connected')
    });
  }
  emit(event: any, data: any) {
    this.socket.emit(event, data);
  }
  static init(server: any) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}
export default {
  connect: Socket.init,
  connection: Socket.getConnection
}