const handlers = {};

export function getItemHandler(type, config = null) {
  const c = typeof type === 'string' ? handlers[getID(type, config)] : type;
  return c || handlers[getDefaultType(config)];
}

export function registerEditorItem(type, handler, config = null) {
  handlers[getID(type, config)] = handler;
}

function getID(type, config = null) {
  return `${type}${config && config.readonly ? ':readonly' : ''}`;
}

function getDefaultType(config = null) {
  return config && config.readonly ? 'readonly' : 'text';
}
