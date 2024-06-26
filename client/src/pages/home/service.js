/*
 * @Description: request调用示例
 * @Author: Danylko
 * @Date: 2024-05-31 07:52:02
 * @LastEditTime: 2024-06-27 07:45:05
 */
import request from '@/utils/request'

// post接口示例
export const postData = async (username, password) => {
  try {
    const data = {
      username,
      password
    }
    const response = await request.post('/login', data, {
      headers: {
        'Content-Type': 'application/json' // 设置 Content-Type
      }
    })
    return response
  } catch (error) {
    console.error('POST 请求出错', error)
    throw error
  }
}

// get接口示例
export const getData = async (username) => {
  try {
    const params = {
      username
    }
    const response = await request.get(
      '/data',
      { params },
      {
        headers: {
          'Content-Type': 'application/json' // 设置 Content-Type
        }
      }
    )
    return response
  } catch (error) {
    console.error('GET 请求出错', error)
    throw error
  }
}

export const getTest = async () => {
  try {
    const response = await request.get('/test', {
      headers: {
        'Content-Type': 'application/json' // 设置 Content-Type
      }
    })
    return response
  } catch (error) {
    console.error('GET 请求出错', error)
    throw error
  }
}
