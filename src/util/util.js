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
export const num_format = (num, type=1) => {
  if (!Number(num)) 
    return '不是number类型'
  switch (type) {
    case 1: //评论数格式
      if (num >= 100000) {
        return '10w+'
      } else if (num >= 10000) {
        return '1w+'
      } else if (num >= 1000) {
        return '999+'
      } else {
        return num
      }
      break;
    case 2: //评论点赞格式
    
      break;  
    case 3: //歌曲听众格式
      
      break;  
  }

}