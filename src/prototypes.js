(() => {
  const anotherObject = { a: 2 };

  const object = Object.create(anotherObject);

  console.log('object.a', object.a);

  console.log(Object.prototype.hasOwnProperty.call(object, 'a'));
})();

(() => {
  console.log(Object.getOwnPropertyNames(Object.prototype));
})();

(() => {
  const anotherObject = { a: 2 };

  const object = Object.create(anotherObject);

  object.a = 3;

  console.log('object.a', object.a);
  console.log('anotherObject.a', anotherObject.a);
})();

(() => {
  const anotherObject = {
    a: 2
  };

  const myObject = Object.create(anotherObject);

  console.log(anotherObject.a);
  console.log(myObject.a);

  console.log(anotherObject.hasOwnProperty('a'));
  console.log(myObject.hasOwnProperty('a'));

  myObject.a++;

  console.log(anotherObject.a);
  console.log(myObject.a);

  console.log(myObject.hasOwnProperty('a'));
})();

(() => {
  const anotherObject = {
    a: 2
  };

  const myObject = Object.create(anotherObject);

  console.log(Object.getPrototypeOf(myObject));
})();

(() => {
  function Foo() {
    this.var = 12;
    this.func = () => console.log('func');
  }

  const a = new Foo();

  console.log(Object.getPrototypeOf(a) === Foo.prototype);
  console.log(Foo.prototype);
  console.log(Foo.prototype);
  console.log(Foo.prototype.constructor === Foo);
  console.log(' a.__proto__',  a.__proto__);
})();

(() => {
  function Foo(name) {
    this.name = name;
    this.myName = function() {
      return 'wrong name';
    };
  }

  Foo.prototype.myName = function() {
    return this.name;
  };

  const a = new Foo('a');
  const b = new Foo('b');

  console.log(a.myName());
  console.log(b.myName());

  console.log(a.__proto__.myName.call(a));
  console.log(b.__proto__.myName.call(b));
})();

(() => {
  function Foo() {}

  Foo.prototype = {};

  const a = new Foo();
  console.log('a.constructor', a.constructor);
})();

// (Prototypal) Inheritance
(() => {
  function Foo(name) {
    this.name = name;
  }

  Foo.prototype.myName = function() {
    return this.name;
  };

  function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
  }

  console.log('Foo.prototype', Foo.prototype);

  Bar.prototype = Object.create(Foo.prototype);

  Bar.prototype.myLabel = function() {
    return this.label;
  };

  const a = new Bar('a', 'obj a');

  console.log('a.myName()', a.myName);
  console.log('a.myName()', a.myName());
  console.log('a.myLabel()', a.myLabel());

  console.log('a', a);
  console.log('a.name', a.name);
  console.log('b.label', a.label);

  console.log('Bar.prototype', Bar.prototype);
  console.log('Object.getPrototypeOf(Bar.prototype)', Object.getPrototypeOf(Bar.prototype));
})();

(() => {
  const A = { a: 2 };
  const B = { b: 1 };

  Object.setPrototypeOf(A, B);

  console.log(A.a);
  console.log(A.b);
  console.log(B.a);
  console.log(B.b);

  Object.setPrototypeOf(B, A);

  console.log(A.a);
  console.log(A.b);
  console.log(B.a);
  console.log(B.b);
})();
