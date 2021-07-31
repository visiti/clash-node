import { ajax } from 'rxjs/ajax'
import xhr2 from 'xhr2'
import { delayNode } from '../pipe/delayNode.js'
import { readYaml, writeNode } from '../lib/fsYaml.js';
const XHR2 = typeof XMLHttpRequest !== 'undefined' ? XMLHttpRequest : xhr2

// 接口地址 host（127.0.0.1） + 控制端口
ajax({
    url: "http://127.0.0.1:9090/proxies",
    createXHR: () => new XHR2(),
    method: 'GET',
}).pipe(
    delayNode()
).subscribe(val => {
    let clashConfig = readYaml('clash-node.yaml');
    let proxies = clashConfig.proxies;
    let flagMap = new Map();
    let newProxies = [];
    for (let proxie of proxies) {
        for (let Id of val) {
            let nameId = Id.split(' ');
            if (proxie.name === Id) {
                flagMap.set(nameId[0], flagMap.get(nameId[0]) + 1 || 1);
                nameId[nameId.length - 1] = flagMap.get(nameId[0]);
                proxie.name = nameId.join(' ');
                newProxies.push(proxie);
                break;
            }
        }
    }
    writeNode(newProxies, './clash-node.yaml', './clash-node.yaml')
})