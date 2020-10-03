import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

loader.load(`${__dirname}/application.yaml`);

const typedSafeContainer = {

  get<T>(name: string): T {
    const item = container.get(name) as T;
    return item;
  },

  getAs<T>(name: string, ctor: { new(...args: any[]): T }): T {
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
