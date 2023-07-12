const { Booking, Room } = require('./index');



// Poner las variables dentro de los test //


//------------------BOOKING------------//

// beforeEach(() => {
//     room = { rate: 1000 }; // Datos ficticios de la habitación
//     booking = new Booking('John Doe', 'johndoe@example.com', '2023-07-01', '2023-07-05', 10, room);
//   });
describe("Booking.discount to be an int", () => {
  it("Is int", () => {
    expect(new Booking("pepe", "hola@hola", new Date(), new Date(), 55, new Room("qwe", [], 1, 0)).discount % 1).toEqual(0);
  });

  it("Is int", () => {
    expect(new Booking("pepe", "hola@hola", new Date(), new Date(), 55, new Room("qwe", [], 1, 0)).discount % 1).toEqual(0);
  });

  it("Is float", () => {
    expect(() => new Booking("pepe", "hola@hola", new Date(), new Date(), 5.7, new Room("qwe", [],1, 0))).toThrow();
  });

  it("Is float", () => {
    expect(() => new Booking("pepe", "hola@hola", new Date(), new Date(), 52.17, new Room("qwe", [],1, 0))).toThrow();
  });
})


describe('Booking', () => {
  let room;
  let booking;



test('El captador de tarifas debe calcular la tarifa correcta con descuentos', () => {

  const room = new Room(1000);
  let booking = new Booking('John Doe', 'johndoe@example.com', '2023-07-01', '2023-07-05', 20, room);
  const roomRate = room.rate;
  const discountedRate = roomRate - (roomRate * booking.discount) / 100; // Aplicar descuento del 20%
  const expectedFee = discountedRate;

  expect(booking.fee).toBe(expectedFee);
});


  test('El captador de tarifas debe calcular la tarifa correcta con descuentos', () => {
    // Cálculo del resultado esperado
    
    const room = new Room(1300);
    let booking = new Booking('John Doe', 'johndoe@example.com', '2023-07-01', '2023-07-05', 30, room);
    const roomRate = room.rate;
    const discountedRate = roomRate - (roomRate * booking.discount) / 100; // Aplicar descuento del 30%
    const expectedFee = discountedRate;

    expect(booking.fee).toBe(expectedFee);
  });


// Cálculo incorrecto de la tarifa con descuento
  test('El captador de tarifas debe calcular la tarifa INCORRECTA con descuentos', () => {
    const room = new Room(300);
    let booking = new Booking('John Doe', 'johndoe@example.com', '2023-07-01', '2023-07-05', 70, room);
    const discount = booking.discount

    const roomRate = room.rate;
    const discountedRate = roomRate - (roomRate * discount) / 100;
    const expectedFee = discountedRate; 

    expect(booking.fee).toBe(expectedFee);
  });

  test('Comprobar que el resultado sea un numero', () => {
    const room = new Room(300);
    let booking = new Booking('John Doe', 'johndoe@example.com', '2023-07-01', '2023-07-05', 70, room);
    const discount = booking.discount

    const roomRate = room.rate;
    const discountedRate = roomRate - (roomRate * discount) / 100;
    const expectedFee = discountedRate; 

    expect(typeof expectedFee).toBe('number');
  });
});
describe('calculateNumberOfDays debe devolver el número CORRECTO de días', () => {
  test('calculateNumberOfDays debe devolver el número CORRECTO de días.', () => {
    const checkIn = new Date('2023-07-10');
    const checkOut = new Date('2023-07-15');
    const booking = new Booking('pepe', 'hola@hola', checkIn, checkOut, 0, new Room('qwe', 1, 0));
    expect(booking.calculateNumberOfDays()).toBe(6);
  });
  test('calculateNumberOfDays debe devolver el número CORRECTO de días.', () => {
    const checkIn = new Date('2023-07-01');
    const checkOut = new Date('2023-07-15');
    const booking = new Booking('pepe', 'hola@hola', checkIn, checkOut, 0, new Room('qwe', 1, 0));
    expect(booking.calculateNumberOfDays()).toBe(15);
  });

});


describe("Booking.room is instanceof Room", () => {
  it("is Room", () => {
    const room = new Room(1300, "Room 1", 10); // Crear una instancia válida de Room
    const booking = new Booking("John Doe", "johndoe@example.com", new Date(), new Date(), 0, room);

    expect(booking.room instanceof Room).toBeTruthy();
  });

  it("is array", () => {
    const room = new Room(1300, "Room 1", 10); // Crear una instancia válida de Room
    const booking = new Booking("John Doe", "johndoe@example.com", new Date(), new Date(), 0, room);

    expect(booking.room instanceof Room).toBeTruthy();
  });
});


// ROOMS

describe('Room', () => {
    let room;
  
    test('isOccupied should return false if room is not occupied on a given date', () => {
      room = new Room('Room 1', 1000, 10);
      const date = new Date('2023-07-01');
      expect(room.isOccupied(date)).toBe(false);
    });
  
    test('isOccupied should return true if room is occupied on a given date', () => {
      room = new Room('Room 1', 1000, 10);
      const booking = {
        checkIn: '2023-07-01',
        checkOut: '2023-07-05',
      };
      room.bookings.push(booking);
      const date = new Date('2023-07-03');
      expect(room.isOccupied(date)).toBe(true);
    });
  
  
    
    test('occupancyPercentage should return 0 if there are no bookings within the range', () => {
      room = new Room('Room 1', 1000, 10);
      const startDate = '2023-07-01';
      const endDate = '2023-07-05';
      expect(room.occupancyPercentage(startDate, endDate)).toBe(0);
    });
  
    test('totalOccupancyPercentage should return the correct percentage of occupied rooms across all rooms', () => {
      
      const rooms = [
        new Room('Room 1', 1000, 0),
        new Room('Room 2', 2000, 10),
        new Room('Room 3', 1500, 20),
      ];
      const startDate = '2023-07-01';
      const endDate = '2023-07-05';
      const booking1 = {
        checkIn: '2023-07-01',
        checkOut: '2023-07-03',
      };
      const booking2 = {
        checkIn: '2023-07-02',
        checkOut: '2023-07-05',
      };
      rooms[0].bookings.push(booking1);
  rooms[1].bookings.push(booking2);
  const occupancyPercentage = Room.totalOccupancyPercentage(rooms, startDate, endDate);
  expect(occupancyPercentage).toBe(Math.round(66.67));
    });
  
    test('availableRooms should return an array of rooms that are not occupied for the entire duration', () => {
      room = new Room('Room 1', 1000, 10);
      const rooms = [
        new Room('Room 1', 1000, 0),
        new Room('Room 2', 2000, 10),
        new Room('Room 3', 1500, 20),
      ];
      const startDate = '2023-07-01';
      const endDate = '2023-07-05';
      const booking1 = {
        checkIn: '2023-07-01',
        checkOut: '2023-07-03',
      };
      const booking2 = {
        checkIn: '2023-07-02',
        checkOut: '2023-07-05',
      };
      rooms[0].bookings.push(booking1);
      rooms[1].bookings.push(booking2);
      const availableRooms = Room.availableRooms(rooms, startDate, endDate);
      expect(availableRooms.length).toBe(1);
      expect(availableRooms[0].name).toBe('Room 3');
    });
  
  });