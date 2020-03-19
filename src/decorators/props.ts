import { PROPS_PROPERTY_KEY } from "src/react/constant";

const Props: PropertyDecorator = (target, propertyKey) => {
  Reflect.set(target.constructor, PROPS_PROPERTY_KEY, propertyKey);
};
export default Props;