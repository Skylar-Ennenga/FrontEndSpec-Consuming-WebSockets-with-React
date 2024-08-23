from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

# Socket Events
@socketio.on('connect')
def handle_connect():
    print("Client Connected")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')

@socketio.on('message')
def handle_message(data):
    print(f'received message: {data}') # server console message
    socketio.emit('message', data) # emits/sends message back to everyone connected

if __name__ == '__main__':
    socketio.run(app)