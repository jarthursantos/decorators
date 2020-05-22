import "reflect-metadata";

const ANNOTATIONS = "__annotations__";

function Injectable() {
  function DecoratorFactory(cls: any, objOrType?: any) {
    const annotationInstance = objOrType;

    const annotations = cls.hasOwnProperty(ANNOTATIONS)
      ? (cls as any)[ANNOTATIONS]
      : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];

    annotations.push(annotationInstance);

    return cls;
  }

  return DecoratorFactory;
}

class ReflectiveInjector {
  private static records: { token: any; dependecies: any }[] = [];

  static resolveAndCreate(tokens: any[]) {
    tokens.forEach((token: any) => {
      ReflectiveInjector.records.push({
        token,
        dependecies: Reflect.getOwnMetadata("design:paramtypes", token),
      });
    });

    return this;
  }

  static get(_token: any) {
    // get the `token` from the record set
    const [record] = ReflectiveInjector.records.filter((record) => {
      return record.token == _token;
    });

    let { token, dependecies } = record;

    // resolve dependencies into instances
    dependecies = dependecies.map((dependecy: any) => {
      return new dependecy();
    });

    // create the instance of the token with the resolved dependencies
    return new token(...dependecies);
  }
}

class Http {
  getFoodGet() {
      return ['rice', 'beans']
  }
}

@Injectable()
class FoodS {
  constructor(private http: Http) {}

  getFood(){
      return this.http.getFoodGet()
  }
}

const injector = ReflectiveInjector.resolveAndCreate([Http, FoodS])
const foodS = injector.get(FoodS)

console.log(foodS.getFood())

/*

import "reflect-metadata";

let construc: Function;

export function classDecorator() {
  console.log("@classDecorator()");

  return function (constructor: Function) {
    console.log("@classDecorator().constructor", {
      constructor,
      metadata: {
        type: Reflect.getMetadata("design:type", constructor),
        paramTypes: Reflect.getMetadata("design:paramtypes", constructor),
        returnType: Reflect.getMetadata("design:returntype", constructor),
      },
      equals: construc === constructor,
    });
  };
}

export function extendableClassDecorator<
  T extends { new (...args: any[]): {} }
>(constructor: T) {
  console.log("@extendableClassDecorator");
  return class extends constructor {
  };
}

export function extendableWithParamsClassDecorator(props: Object) {
  console.log("@extendableWithParamsClassDecorator()", { props });

  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
    };
  };
}

export function methodDecorator<T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) {
  console.log("@methodDecorator", {
    target,
    propertyKey,
    descriptor,
    metadata: {
      type: Reflect.getMetadata("design:type", target, propertyKey),
      paramTypes: Reflect.getMetadata("design:paramtypes", target, propertyKey),
      returnType: Reflect.getMetadata("design:returntype", target, propertyKey),
    },
  });
}

export function withParamsMethodDecorator(value: boolean) {
  console.log("@withParamsMethodDecorator().instancing", { value });

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("@withParamsMethodDecorator().calling", {
      target,
      propertyKey,
      descriptor,
      metadata: {
        type: Reflect.getMetadata("design:type", target, propertyKey),
        paramTypes: Reflect.getMetadata(
          "design:paramtypes",
          target,
          propertyKey
        ),
        returnType: Reflect.getMetadata(
          "design:returntype",
          target,
          propertyKey
        ),
      },
    });
  };
}

export function propertyDecorator(
  target: Object,
  propertyName: string | symbol
) { 
  const reflectMetadataType = Reflect && (Reflect as any).getMetadata ? (Reflect as any).getMetadata("design:type", target, propertyName) : undefined;
        
  console.log("@propertyDecorator", {
    target,
    constructor: target.constructor,
    propertyName,
    reflectMetadataType,
    type: Reflect.getMetadata("design:type", target, propertyName),
  });

  construc = target.constructor;
}

@classDecorator()
class Main {
  constructor(private name: string) {
    console.log("Main", { name });
  }

  @propertyDecorator
  username!: string;

  @methodDecorator
  main(param: number): string {
    console.log("Main.main()");
    return `${this.name} World ${param}!`;
  }
}

console.log(new Main("Hello").main(1));


*/