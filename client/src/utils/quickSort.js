/*
 * @Description: 快速排序
 * @Author: Danylko
 * @Date: 2024-08-01 18:32:05
 * @LastEditTime: 2024-08-01 18:37:43
 */
function quickSort(array) {
  // 辅助函数，用于交换数组中的两个元素
  function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  // 辅助函数，用于进行分区操作
  function partition(arr, left, right) {
    const pivot = arr[Math.floor((right + left) / 2)] // 选择中间元素作为枢轴
    let i = left
    let j = right

    while (i <= j) {
      while (arr[i] < pivot) {
        i++
      }
      while (arr[j] > pivot) {
        j--
      }
      if (i <= j) {
        swap(arr, i, j)
        i++
        j--
      }
    }
    return i
  }

  // 主排序函数，使用递归方式进行快速排序
  function quickSortHelper(arr, left, right) {
    if (arr.length > 1) {
      const index = partition(arr, left, right)
      if (left < index - 1) {
        quickSortHelper(arr, left, index - 1)
      }
      if (index < right) {
        quickSortHelper(arr, index, right)
      }
    }
    return arr
  }

  return quickSortHelper(array, 0, array.length - 1)
}

// 测试
const array = [34, 7, 23, 32, 5, 62]
console.log('原始数组:', array)
const sortedArray = quickSort(array)
console.log('排序后数组:', sortedArray)
