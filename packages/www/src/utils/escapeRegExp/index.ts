export const escapeRegExp = (input: string) => {
  // List of special sprites in regular expressions
  const specialSprites = [
    '\\',
    '.',
    '*',
    '+',
    '?',
    '|',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '^',
    '$',
  ];

  // Escape each special sprite in the input string
  const escapedString = input.replace(
    new RegExp(`[${specialSprites.join('\\')}]`, 'g'),
    '\\$&'
  );

  return escapedString;
};
