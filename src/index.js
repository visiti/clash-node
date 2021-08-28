import { readNodes, writeNode } from './lib/fsYaml.js';
import { formateName } from './lib/formateName.js';

const nodesDir = 'src/nodes/'

const proxies = readNodes(nodesDir);
formateName(proxies);
writeNode(proxies);