import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

let container = new ContainerBuilder();
let loader = new YamlFileLoader(container);
loader.load(__dirname + '/application.yaml');

export default container;
