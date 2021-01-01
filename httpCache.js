/*
 * @Description: http缓存
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 12:10:23
 * @LastEditTime: 2021-01-01 12:31:28
 */

 /**
  * 1. 浏览器缓存分为强制缓存和协商缓存两种。
  * 2. 第一次请求全部不存在缓存，缓存全部对于非第一次请求而言。
  * 3. 强制缓存优先级高于协商缓存，基本过程是：发起请求 =》击中强制缓存则直接返回200
  *    =》否则检查协商缓存字段，击中则返回304 =》 否则服务器返回资源，返回200 
*/

/**
 * 强制缓存：服务器通知浏览器一个缓存时间，在缓存时间内，
 * 下次请求，直接用缓存，不在时间内，执行比较缓存策略。
 * 强制缓存控制字段：Cache-Control（http1.1）和Expires（http1.0）
 * Cache-Control：是一个相对时间，用以表达自上次请求正确的资源之后的多少秒的时间段
 * 内缓存有效。它的优先级比Expires的优先级高。前者的出现是为了解决Expires
 * 在浏览器时间被手动更改导致缓存判断错误的问题。
 * expires：是一个绝对时间。用以表达在这个时间点之前发起请求可以
 * 直接从浏览器中读取数据，而无需发起请求
 * 协商缓存：当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，
 * 并且在请求头中设置了If-Modified-Since 或者 If-None-Match 的时候，
 * 会将这两个属性值到服务端去验证是否命中协商缓存，如果命中了协商缓存，
 * 会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。
 * Last-Modified/If-Modified-since：服务器通过 Last-Modified 字段告知客户端，
 * 资源最后一次被修改的时间，例如 Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT
 * 服务器会将 If-Modified-Since 的值与 Last-Modified 字段进行对比。
 * 如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。
 * Etag/If-None-match：Etag 的优先级高于 Last-Modified
 * Etag 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 Etag 字段。
 * 之后的流程和 Last-Modified 一致，只是 Last-Modified 字段和它所表示的
 * 更新时间改变成了 Etag 字段和它所表示的文件 hash，把 If-Modified-Since 变成了
 * If-None-Match。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。
*/