export const integ = (num, dig = 10000) => {
  if (typeof num != "number") 
    return 'error'
  let length = String(Math.floor(num)).length;
  if (length >= 9) {
    return `${parseInt((num / 100000000) * 10) / 10}亿`;
  }
  if (length >= 5) {
    return `${Math.floor(num / 10000)}万`;
  }
};

export const objCopy = obj => {
  return JSON.parse(JSON.stringify(obj))
}
