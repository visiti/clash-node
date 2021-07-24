import fs from 'fs';
import YAML from 'yaml'

export function readNodes(dirPath = 'src/nodes/') {
    try {
        const files = fs.readdirSync(dirPath)
        const proxies = [];
        const proxiesSet = new Set();
        files.forEach(file => {
            let clashNodes = YAML.parse(fs.readFileSync(dirPath + file, 'utf-8')).proxies;
            for (const clashNode of clashNodes) {
                let vpnID = `${clashNode.server}:${clashNode.port}`
                if (proxiesSet.has(proxiesSet.has(vpnID))) {
                    continue;
                }
                proxiesSet.add(vpnID);
                proxies.push(clashNode)
            }
        }
        )
        return proxies;
    } catch (error) {
        console.log(error)
    }
}

export function writeNode(bolb, path = './clash-node.yaml', templatePath = 'src/config/template.yaml') {
    try {
        let template = YAML.parse(fs.readFileSync(templatePath, 'utf-8'));
        template.proxies = bolb;
        template['proxy-groups'][0].proxies = bolb.map(item => item.name).sort()
        fs.writeFileSync(path, YAML.stringify(template));
    } catch (error) {
        console.log(error);
    }
}