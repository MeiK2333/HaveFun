import "reflect-metadata";
import ObjectHash from 'object-hash';
import NodeCache from 'node-cache';

const cache = new NodeCache();

const handleDecorator = (cacheTTL, target, propertyKey, descriptor) => {
  const originalFunction = descriptor.value;
  descriptor.value = function () {
    const getValueAndAddToCache = () => {
      const result = originalFunction.apply(null, arguments);
      cache.set(hash, result, cacheTTL);
      return result;
    };
    const hash = ObjectHash({ method: propertyKey + target.constructor.name, args: [...arguments] });
    let data = cache.get(hash);
    if (data === undefined) {
      data = getValueAndAddToCache();
      Reflect.defineMetadata('updated_at', new Date().toISOString(), target);
    }
    return data;
  };
  return descriptor;
};


export const cached = ({ cacheTTL = 10 } = {}) => (target, propertyKey, descriptor) => {
  let result;
  result = handleDecorator(cacheTTL, target, propertyKey, descriptor);
  return result;
}

export default {
  cached,
}