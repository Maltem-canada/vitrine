export default function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}
