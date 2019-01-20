import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

loader.load(`${__dirname}/application_${env}.yaml`);

const typedSafeContainer = {

  get<T>(name: string, ctor: { new(...args: any[]): T }): T {
    const item = container.get(name);

    if (!(item instanceof ctor)) {
      const error = new Error(`Expected ${ctor.name}, found ${item.constructor.name}`);
      error.name = 'TypeMissmatchError';
      throw error;
    }

    return item;
  }
  
} 

export default typedSafeContainer;
