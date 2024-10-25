export function make2DArrayNonOverlapping(arr) {
  // 对二维数组按照起始位置排序
  arr.sort((a, b) => a[0] - b[0]);
  const result = [];
  let current = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] >= current[1]) {
      // 如果当前区间与下一个区间不相交，将当前区间加入结果数组
      result.push(current);
      current = arr[i];
    } else {
      // 如果相交，更新当前区间的结束位置为两个区间结束位置的较大值
      current[1] = Math.max(current[1], arr[i][1]);
    }
  }
  // 将最后一个区间加入结果数组
  result.push(current);
  return result;
}
