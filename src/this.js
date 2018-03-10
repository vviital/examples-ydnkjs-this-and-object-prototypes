// Replacement of this

function identify() {
  return this.name.toUpperCase();
}

function speak() {
  const greeting = 'Hello, I\'m ' + identify.call(this);

  console.log(greeting);
}

const me = {
  name: 'Kyle',
};

const you = {
  name: 'Reader',
};

console.log(identify.call(me));
console.log(identify.call(you));

speak.call(me);
speak.call(you);

// How this doesn't work. This doesn't point to function itself

function foo(num) {
  console.log('foo: ' + num);

  this.count = (this.count || 0) + 1;

  console.log('this.count', this.count);
}

foo.count = 0;

for (let i = 0; i < 10; ++i) {
  if (i > 5) foo(i);
}

console.log(foo.count);
console.log(foo);
// actually we incremented global.count value
console.log(global.count);

// --------------------------------------

function foo(num) {
  console.log('foo: ' + num);

  foo.count++;
}

foo.count = 0;

for (let i = 0; i < 10; ++i) {
  if (i > 5) foo(i);
}

console.log(foo.count);
console.log(foo);

// --------------------------------------

function foo(num) {
  console.log('foo: ' + num);

  this.count = (this.count || 0) + 1;
}

for (let i = 0; i < 10; ++i) {
  if (i > 5) foo.call(foo, i);
}

console.log(foo.count);
console.log(foo);

// --------------------------------------

// How this doesn't work. This is not a scope
// This is not a bridge between two lexical scopes

function foo() {
  const a = 2;
  this.bar();
}

function bar() {
  console.log(this.a);
}

foo();
