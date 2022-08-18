/**
 * Generate a numeric hash of the given string, similar to Javas String::hashCode
 *
 * Does not guarantee uniqueness!
 *
 * @param stringToHash
 * @return {number}
 */
export default function dhlHash(stringToHash) {
  let hash = 0;
  if (stringToHash.length === 0 || typeof stringToHash !== 'string') {
    return hash;
  }
  for (let i = 0; i < stringToHash.length; i += 1) {
    const char = stringToHash.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
    // eslint-disable-next-line no-bitwise
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
}
