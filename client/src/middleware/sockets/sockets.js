import io from 'socket.io-client';

export default function socketMiddleware() {
  let socket;
  if (process.env.NODE_ENV !== 'development') {
    socket = io.connect();
  } else {
    socket = io();
  }
  console.log(socket);
  return ({ dispatch }) => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }
    const { event, leave, handle, emit, payload, ...rest } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    if (emit) {
      socket.emit(event, payload);
      return;
    }

    let handleEvent = handle;
    if (typeof handleEvent !== 'function') {
      handleEvent = result => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
}
