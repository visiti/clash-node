import { flagMap } from './flagMap.js';
export function formateName(proxies) {
    let nameMap = new Map();
    for (const proxie of proxies) {
        for (const key in flagMap) {
            let reg = new RegExp(flagMap[key]);
            if (reg.test(proxie.name)) {
                nameMap.set(key, nameMap.get(key) + 1 || 1)
                proxie.name = `${key} ${nameMap.get(key)}`
                break;
            }
        }
    }
}

