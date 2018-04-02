(() => {
  class Vehicle {
    ignition() {
      console.log('Turning on my engine.');
    }

    drive() {
      this.ignition();
      console.log('Steering and moving forward!');
    }
  }

  class Car extends Vehicle {
    drive() {
      super.drive();
      console.log('Rolling on all wheels!');
    }
  }

  class SpeedBoat extends Vehicle {
    ignition() {
      console.log('Turning on all my engines.');
    }

    pilot() {
      super.drive();
      console.log('Speeding through the water with ease!');
    }
  }

  const car = new Car();

  console.log('--- car ---');
  car.drive();

  console.log('--- speed boat ---');

  const boat = new SpeedBoat();
  // Which version of ignition() will the language engine use, the one from Vehicle or the one from SpeedBoat?
  boat.drive();
})();

// Explicit mixin
(() => {
  function mixin(source, target) {
    for(let key in source) {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }

    return target;
  }

  const Vehicle = {
    engines: 1,

    ignition() {
      console.log('Turning on my engine.');
    },

    drive() {
      this.ignition();
      console.log('Steering and moving forward!');
    }
  };

  const Car = mixin(Vehicle, {
    wheels: 4,

    drive() {
      Vehicle.drive.call(this);
      console.log('Rolling on all', this.wheels, 'wheels!');
    }
  });

  Car.drive();
})();

// Implicit mixin
(() => {
  const Something = {
    cool() {
      this.greeting = 'Hello World';
      this.count = this.count ? this.count + 1 : 1;
    }
  };

  Something.cool();
  console.log(Something.greeting); // "Hello World"
  console.log(Something.count); // 1

  const Another = {
    cool() {
      Something.cool.call(this);
    }
  };

  Another.cool();
  console.log(Another.greeting); // "Hello World"
  console.log(Another.count); // 1
})();
