import Manager from "../core/manager";

interface PropertyOptions {
  name: string;
}

export function Property(): void | any;
export function Property(options: PropertyOptions): void | any;
export function Property(target: Object, name: string): void | any;

export function Property(...args: any[]): void | any {
  let options: PropertyOptions;

  function register(target: Object, name: string) {
    if (!options) {
      options = { name };
    }

    Manager.registerColumn(target.constructor, {
      name: options.name,
      type: Reflect.getMetadata("design:type", target, name),
    });
  }

  if (args.length === 1) {
    options = args[0];
  } else if (args.length === 3) {
    register(args[0], args[1]);
    return;
  }

  return register;
}
