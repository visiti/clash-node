import { ajax } from 'rxjs/ajax'
import xhr2 from 'xhr2'
import { delayNode } from '../pipe/delayNode.js'
const XHR2 = typeof XMLHttpRequest !== 'undefined' ? XMLHttpRequest : xhr2

// 接口地址host 在配置文件的 external-controller 字段
ajax({
    url: "http://127.0.0.1:9090/proxies",
    createXHR: () => new XHR2(),
    method: 'GET',
}).pipe(
    delayNode()
).subscribe(val => {
    console.log(val.length)
})