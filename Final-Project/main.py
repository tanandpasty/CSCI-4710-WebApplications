from website import create_app, socketio
from flask_socketio import send, emit, join_room, leave_room

app = create_app()

@socketio.on('user_joined')
def joined(msg):
	username = msg['user']
	emit('status', {'msg': ' has entered the realm' + '>', 'user': username})


@socketio.on('message')
def message(msg):
	username = msg['user']
	emit('message', {'msg': msg['msg'], 'user': username})


@socketio.on('user_left')
def user_left(msg):
	username = msg['user']
	emit('status', {'msg': ' has left the realm' + '>', 'user': username})


if __name__ == '__main__':
	socketio.run(app, debug=True)
