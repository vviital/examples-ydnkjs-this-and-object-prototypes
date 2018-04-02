// Rules of applying this

// Rule #1. Default binding
function foo() {
  console.log(this.a);
}

global.a = 2;

foo();

// --------------------------------------

function foo() {
  "use strict"
  console.log(this.a);
}

global.a = 2;

foo();

// --------------------------------------

// To prevent default rule, strict mode should be specified within functon
function foo() {
  console.log(this.a);
}

global.a = 2;

(function() {
  "use strict";
  foo();
})();

// --------------------------------------

// Rule #2. Implicit Binding

function foo() {
  console.log(this.a);
}

const obj = {
  a: 2,
  foo,
};

obj.foo();

// Only the top/last level of an object property reference chain matters to the call-site
function foo() {
  console.log(this.a);
}

const obj2 = {
  a: 42,
  foo,
};

const obj1 = {
  a: 2,
  obj2,
};

obj1.obj2.foo();

// --------------------------------------

// Implicitly bound function loses implicit binding and falls back to default one.
function foo() {
  console.log(this.a);
}

const obj = {
  a: 2,
  foo,
};

const bar = obj.foo;
global.a = 'oops, global';

bar();

// --------------------------------------

function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  fn();
}

const obj = {
  a: 2,
  foo,
};

global.a = 'oops, global';

doFoo(obj.foo);

// Rule #3. Explicit Binding
// We can accomplish this type of binding by call(...) and apply(...)

function foo() {
  console.log(this.a);
}

const obj = { a: 2 };

foo.call(obj);

// --------------------------------------

function foo() {
  console.log(this.length);
  this.a = 12;
  console.log(this.a);
  console.log(this.valueOf());
}

const string = 'string';

foo.call(string);

// Hard Binding

function foo() {
  console.log(this.a);
}

const obj = { a: 2 };

const bar = function() {
  foo.call(obj);
}

bar();
setTimeout(bar, 1000);
bar.call(global);

// --------------------------------------

function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

const obj = { a: 2 };
const bar = foo.bind(obj);

const b = bar(3);
console.log(b);

// Rule #4. new Binding

// - a brand new object is created
// - new newly constructed object is [[Prototype]] - linked
// - the newwly constructed object is set as the this binding for that function call
// - unless the function returns its own alternate object,
//   the new-invoked function call will automatically return the newly constructed object.
function foo() {
  this.a = 2;
}

const bar = new foo(2);
console.log(bar.a);

// Order of rules

function foo() {
  console.log(this.a);
}

const obj1 = {
  a: 2,
  foo,
};

const obj2 = {
  a: 3,
  foo,
};

obj1.foo();
obj2.foo();

obj1.foo.call(obj2);
obj2.foo.call(obj1);

// Explisit binding takes precedence over implicit binding.

function foo(something) {
  this.a = something;
}

const obj1 = { foo };
const obj2 = {};

obj1.foo(2);
console.log(obj1.a);

obj1.foo.call(obj2, 3);
console.log(obj2.a);

const bar = new obj1.foo(4);
console.log(bar.a);
console.log(obj1.a);

// new binding is more precedent than implicit binding.

function foo(something) {
  this.a = something;
}

const obj1 = {};

const bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);

const baz = new bar(3);
console.log(obj1.a);
console.log(baz.a);

function bind(fn, obj) {
  return function(...args) {
    fn.apply(obj, args);
  }
}

const bak = bind(foo, obj1);
const bay = new bak(4);
console.log(obj1.a);
console.log(bay.a);

// new binding is more precedent than implicit binding.

function foo(a, b) {
  console.log('a: ' + a, 'b: ' + b);
}

const ø = Object.create(null);
foo.apply(ø, [2, 3]);

const bar = foo.bind(ø, 2);
bar(3);

// --------------------------------------

function foo() {
  console.log(this.a);
}

global.a = 2;
const o = { a: 3, foo };
const p = { a: 4 };

o.foo();
(p.foo = o.foo)();
p.foo();
