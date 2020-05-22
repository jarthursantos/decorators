export function Query<T>(type: { new (): T }): any | void {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(params: T) => Promise<T>>
  ) {
    let originalMethod = descriptor.value;
    //wrapping the original method

    descriptor.value = async function (params: T): Promise<T> {
      if (!originalMethod) {
        throw Error("null method");
      }

      let result = originalMethod.apply(this, [params]);
      return result;
    };

    // function resolve(...args: any[]): T {
    //   const result = new type();

    //   Object.assign(result, args)

    //   return result;
    // }

    // descriptor.value = resolve;
  };
}

interface QueryProps<R> {
  fields: R;
}

type TypedQueryProps<P, T> = QueryProps<P> & T;

export interface Type<T> extends Function {
  new (...args: any[]): T; 
}

export function RawQuery<Model>(type: Type<Model>) {
  return function <Props = {}>(
    s: TemplateStringsArray,
    ...i: Array<
      (props: TypedQueryProps<Model, Props>) => string | number | boolean
    >
  ) {
    return function (
      _target: any,
      _propertyKey: string,
      descriptor: TypedPropertyDescriptor<(props: Props) => Promise<Model>>
    ) {
      console.log({ descriptor, type, s, i });
    };
  };
}

export function Insert<Model, Relations = {}>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<(data: Model) => Promise<Model>>
): any | void;
export function Insert<Model, Relations = {}>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<
    (data: Model, relations: Relations) => Promise<Model>
  >
): any | void;
export function Insert<Model, Relations = {}>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<
    (data: Model, relations?: Relations) => Promise<Model>
  >
): any | void {}

export function Update(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): any | void {}
