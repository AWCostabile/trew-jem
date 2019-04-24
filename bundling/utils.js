const toColour = (inputText = '', effects = []) => {
  const _effects = typeof effects == 'string' ? [effects] : effects;
  return (
    inputText &&
    `${_effects.reduce((next, effect) => {
      switch (effect) {
        case 'bright':
          return `\x1b[1m${next}`;
        case 'dim':
          return `\x1b[2m${next}`;
        case 'underscore':
          return `\x1b[4m${next}`;
        case 'black':
          return `\x1b[30m${next}`;
        case 'red':
          return `\x1b[31m${next}`;
        case 'green':
          return `\x1b[32m${next}`;
        case 'yellow':
          return `\x1b[33m${next}`;
        case 'blue':
          return `\x1b[34m${next}`;
        case 'magenta':
          return `\x1b[35m${next}`;
        case 'cyan':
          return `\x1b[36m${next}`;
        case 'white':
          return `\x1b[37m${next}`;
        default:
          return next;
      }
    }, inputText)}\x1b[0m`
  );
};

const multiColor = inputParams =>
  inputParams
    .map(([inputText, effects]) => toColour(inputText, effects))
    .join('');

module.exports = {
  multiColor,
  toColour
};
