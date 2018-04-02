(() => {
  // Objects

  let obj1;
  // Literal form
  obj1 = { key: 1 };
  // Constructed form
  obj1 = new Object();
  obj1.key = 1;

  let strPrimitive = 'I am a string';

  console.log(typeof strPrimitive);
  console.log(strPrimitive instanceof String);

  const strObject = new String('I am a string');
  console.log(typeof strObject);
  console.log(strObject instanceof String);
  console.log(Object.prototype.toString.call(strObject));

  // Build-in Objects
  // - String
  // - Number
  // - Boolean
  // - Object
  // - Function
  // - Array
  // - Date
  // - RegExp
  // - Error
  // 

  const array = [1, 2, 3];

  array[10] = 11;

  console.log('array', array);

  for (let value of array) {
    console.log(value);
  }

  // Property descriptor

  let myObject = { a: 2 };

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  myObject = { a: 2 };
  Object.defineProperty(myObject, 'a', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true,
  });

  console.log(myObject.a);

  myObject = {};
  Object.defineProperty(myObject, 'a', {
    value: 2,
    writable: false,
    configurable: true,
    enumerable: true,
  });

  myObject.a = 3;
  console.log(myObject.a);

  console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
  console.log(({}).toString());

  Object.defineProperty(Object.prototype, 'toString', {
    value: () => 'muhahahha',
    writable: false,
    configurable: false,
    enumerable: false,
  });

  console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
  console.log(({}).toString());
})();

(() => {
  const myObject = {};

  Object.defineProperty(myObject, 'FAVORITE_NUMBER', {
    value: 42,
    writable: false,
    configurable: false,
    enumerable: true,
  });

  console.log(myObject.FAVORITE_NUMBER);

  myObject.FAVORITE_NUMBER = 12;

  console.log(myObject.FAVORITE_NUMBER);
})();

(() => {
  const myObject = { a: 2 };

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  Object.preventExtensions(myObject);

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  myObject.b = 3;
  myObject.a = 42;

  console.log(myObject);
})();

(() => {
  // Object.preventExtensions + { ..., configurable: false, ... }
  const myObject = { a: 2 };

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  Object.seal(myObject);

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  myObject.b = 3;
  myObject.a = 42;

  console.log(myObject);
})();

(() => {
  // Object.seal + { ..., writable: false, ... }
  const myObject = { a: 2 };

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  Object.freeze(myObject);

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  myObject.b = 3;
  myObject.a = 42;

  console.log(myObject);
})();

(() => {
  // Getters and setters

  const myObject = {
    get a() {
      return 2;
    }
  };

  console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));

  Object.defineProperty(myObject, 'b', {
    get() {
      return this.a * 2;
    },
    enumerable: true,
    configurable: true,
  });

  console.log(Object.getOwnPropertyDescriptor(myObject, 'b'));

  for(let key of Object.keys(myObject)) {
    console.log(key, myObject[key]);
  }
  console.log(myObject);
})();

(() => {
  // Getters and setters

  const myObject = {
    get a() {
      return this._a_;
    },

    set a(val) {
      this._a_ = val * 2;
    }
  };

  myObject.a = 2;

  console.log(myObject.a);
})();

(() => {
  // Getters and setters

  const rnd = {
    get next() {
      return Math.random();
    }
  };

  console.log(rnd.next);
  console.log(rnd.next);
  console.log(rnd.next);
})();

(() => {
  const obj1 = { a: 1 };

  console.log(('a' in obj1));
  console.log(('b' in obj1));
  console.log(('toString' in obj1));

  console.log('--- --- --- --- ---');

  console.log(Object.prototype.hasOwnProperty.call(obj1, 'a'));
  console.log(Object.prototype.hasOwnProperty.call(obj1, 'b'));
  console.log(Object.prototype.hasOwnProperty.call(obj1, 'toString'));
})();

(() => {
  const array = [1, 2, 3];

  for(let index of [0, 1, 2, 3, 4, 5]) {
    console.log(index, index in array);
  }
})();

(() => {
  // Revisit enumerable properties

  const object = {};

  Object.defineProperty(object, 'a', { enumerable: true, value: 2 });
  Object.defineProperty(object, 'b', { enumerable: false, value: 3 });

  console.log(object.b);
  console.log('b' in object);
  console.log(Object.prototype.hasOwnProperty.call(object, 'b'));

  for (let k in object) {
    console.log(k, object[k]);
  }

  console.log(Object.keys(object));
})();

(() => {
  const object = {};

  Object.defineProperty(
    object,
    'a',
    { enumerable: true, value: 2 }
  );

  Object.defineProperty(
    object,
    'b',
    { enumerable: false, value: 3 }
  );

  console.log(Object.prototype.propertyIsEnumerable.call(object, 'a'));
  console.log(Object.prototype.propertyIsEnumerable.call(object, 'b'));

  console.log(Object.keys(object));
  console.log(Object.getOwnPropertyNames(object));
})();
