import Manager from "../core/manager";

export function Entity(name: string) {
  return function (constructor: Function) {
    Manager.registerTable({ name, constructor }); 
  };
}
