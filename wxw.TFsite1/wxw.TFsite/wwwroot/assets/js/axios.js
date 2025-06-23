async function post(url, data = {}, config = {}) {
  try {
    // 合并配置，优先使用用户传入的headers
    // const token = 'Bearer ' + getSysCookie('token')
    if (config.headers) {
      // config.headers.Authorization = token
    } else {
      config.headers = {
        // Authorization: token
      }
    }
    axios.defaults.baseURL = 'https://localhost:44330'
    config.headers['Content-Type'] = 'application/json'
    config.headers['Access-Control-Allow-Origin'] = '*'

    // 处理FormData（自动设置Content-Type）
    if (data instanceof FormData) {
      delete mergedConfig.headers['Content-Type']; // 让浏览器自动设置boundary
    }
    return new Promise((resolve, reject) => {
      axios.post(url, data, config).then(
        response => {
          if (!response) return;
          resolve(response.data);
        },
        err => {
          if (err.response) {
            if (err.response.status == 401) {
              resolve({
                success: false,
                message: err.response.data.message,
              });
              store._mutations.logout[0]();
            } else {
              resolve({
                success: false,
                message: `由于服务器繁忙，请稍后再试 (Status:${err.response.status}${err.response.statusText
                  ? ` Text:${err.response.statusText}`
                  : ''
                  })`,
              });
            }
          } else {
            resolve({
              success: false,
              message: '由于服务器繁忙，请稍后再试',
            });
          }
        }
      );
    });
  } catch (error) {
    console.error('请求失败:', error.message);

    // 增强错误信息
    if (error.response) {
      // 服务器返回错误响应
      console.error('响应数据:', error.response.data);
      console.error('响应状态:', error.response.status);
    } else if (error.request) {
      // 请求已发送但没有响应
      console.error('无响应返回:', error.request);
    } else {
      // 请求设置时出错
      console.error('错误信息:', error.message);
    }

    throw error; // 继续抛出错误，让调用者处理
  }
}
async function get(url, config = {}) {
  try {
    // 合并配置，优先使用用户传入的headers
    // const token = 'Bearer ' + getSysCookie('token')
    // if (config.headers) {
    //   config.headers.Authorization = token
    // } else {
    //   config.headers = {
    //     Authorization: token
    //   }
    // }
    axios.defaults.baseURL = 'https://localhost:44330'
    // config.headers['Access-Control-Allow-Origin'] = '*'

    return new Promise((resolve, reject) => {
      axios.get(url, config).then(
        response => {
          if (!response) return;
          resolve(response.data);
        },
        err => {
          if (err.response) {
            if (err.response.status == 401) {
              resolve({
                success: false,
                message: err.response.data.message,
              });
              store._mutations.logout[0]();
            } else {
              resolve({
                success: false,
                message: `由于服务器繁忙，请稍后再试 (Status:${err.response.status}${err.response.statusText
                  ? ` Text:${err.response.statusText}`
                  : ''
                  })`,
              });
            }
          } else {
            resolve({
              success: false,
              message: '由于服务器繁忙，请稍后再试',
            });
          }
        }
      );
    });
  } catch (error) {
    console.error('请求失败:', error.message);

    // 增强错误信息
    if (error.response) {
      // 服务器返回错误响应
      console.error('响应数据:', error.response.data);
      console.error('响应状态:', error.response.status);
    } else if (error.request) {
      // 请求已发送但没有响应
      console.error('无响应返回:', error.request);
    } else {
      // 请求设置时出错
      console.error('错误信息:', error.message);
    }

    throw error; // 继续抛出错误，让调用者处理
  }
}