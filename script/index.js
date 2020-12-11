const axios = require('axios')
const fs = require('fs')
const path = require('path')

const __PWD__ = process.cwd()
const __DIR__ = path.join(__PWD__, './.temp')
const { mkdirSync } = fs

const toUpperCameCase = (str) => {
  return str
    .replace(/^(\w)/, (match, $1) => $1.toUpperCase())
    .replace(/[_\.-]([a-z])/g, function(all, i) {
      return i.toUpperCase()
    })
}
/**
 * 删除文件夹功能
 * @param  {String} url  文件路径，绝对路径
 * @return {Null}
 * @author huangh 20170123
 */

const deleteDir = (url) => {
  let files = []

  if (fs.existsSync(url)) {
    //判断给定的路径是否存在

    files = fs.readdirSync(url) //返回文件和子目录的数组
    files.forEach(function(file, index) {
      const curPath = path.join(url, file)

      if (fs.statSync(curPath).isDirectory()) {
        //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDir(curPath)
      } else {
        fs.unlinkSync(curPath) //是指定文件，则删除
      }
    })
    fs.rmdirSync(url) //清除文件夹
  } else {
    console.log('给定的路径不存在！')
  }
}
/**
 * @description 获取所有接口的请求方式
 * @param {*} data 数据
 */
const getApiMethods = (data) => {
  const _methods = []
  const _apiMethods = new Set([])
  for (let key in data.paths) {
    const [_method] = Object.keys(data.paths[key])
    _apiMethods.add(toUpperCameCase(_method))
  }
  for (let i of _apiMethods) {
    _methods.push(i)
  }
  return _methods
}
/**
 * @description api头部模版
 * @param {*} data 数据
 */
const writeDefaultTemplate = (data) => {
  let template = `
import { TResult,${getApiMethods(data).join(',')}} from "@/utils/request";\n
const { VUE_APP_API_HOST: API_HOST } = process.env;\n
  `
  return template
}
/**
 * @description api接口模版
 * @param {*} data 数据
 */
const writeApiTemplate = (fileName, data) => {
  let template = ''
  for (let key in data.paths) {
    for (let childKey in data.paths[key]) {
      const [tagName] = data.paths[key][childKey].tags
      if (fileName === tagName) {
        template += `
/**
* @description ${data.paths[key][childKey].summary}
*/
export const ${
          data.paths[key][childKey].operationId
        } = (params: any): TResult<any> => {
return ${toUpperCameCase(childKey)}(\`\${API_HOST}${key}\`, { params });
}
        `
      }
    }
  }

  return template
}

/**
 * @description 写入文件
 */

const writeFileSync = (path, data, options) => {
  try {
    const _files = []
    for (let item of data.tags) {
      let fileName = item.name
      let template = writeDefaultTemplate(data) + writeApiTemplate(fileName,data)
      fs.writeFileSync(`${__DIR__}/${fileName}.ts`, template, options)
    }
  } catch (error) {
    console.log('读取文件失败:', error)
  }
}

/**
 * @description 获取api接口JSON
 */
const getApiJson = async () => {
  // 可选地，上面的请求可以这样做
  try {
    const res = await axios.get('https://task.zhixingtianqi.com/v2/api-docs')
    // 动态生成 .vue 文件夹
    deleteDir(__DIR__)
    mkdirSync(__DIR__)
    writeFileSync(__DIR__, res.data)
    getApiMethods(res.data)
  } catch (error) {
    console.log(error)
  }
}

getApiJson()
