import { AdtProxyBuilder } from "../AdtProxyBuilder";
import { ObjectProxyHandler } from "./ObjectProxyHandler";
import Store from "src/react/store";

interface ObjectProxyBuilderArgs {
  store: Store;
  storePropertyKey: PropertyKey;
  object: object;
  depth: number;
}

export const objectProxyBuilder = ({
  store,
  storePropertyKey,
  object,
  depth,
}: ObjectProxyBuilderArgs): object => {
  if (depth < 0) {
    return object;
  }
  const proxiedObject = new Proxy<object>(
    object,
    new ObjectProxyHandler(store, storePropertyKey)
  );
  for (const key in object) {
    object[key] = AdtProxyBuilder({
      store,
      propertyKey: storePropertyKey,
      value: object[key],
      depth: depth - 1,
      receiver: object,
    });
  }
  return proxiedObject;
};
