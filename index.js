// BOOKING
  // Datos ficticios
  class Room {
    constructor(name, rate, discount) {
      this.name = name;
      this.rate = rate;
      this.discount = discount;
      this.bookings = [];
    }
  
    isOccupied(date) {
      return this.bookings.some(booking => {
        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);
        return date >= checkInDate && date <= checkOutDate;
      });
    }
  
    occupancyPercentage(startDate, endDate) {
      const totalDays = this.calculateNumberOfDays(startDate, endDate);
      const occupiedDays = this.calculateOccupiedDays(startDate, endDate);
    
      const occupancyPercentage = (occupiedDays / totalDays) * 100;
    
      return Math.round(occupancyPercentage);
    }
  
    static totalOccupancyPercentage(rooms, startDate, endDate) {
      const totalRooms = rooms.length;
      const occupiedRooms = rooms.filter(room => room.isOccupiedBetween(startDate, endDate));
      const occupancyPercentage = (occupiedRooms.length / totalRooms) * 100;
      return Math.round(occupancyPercentage);
    }
  
    static availableRooms(rooms, startDate, endDate) {
      return rooms.filter(room => !room.isOccupiedBetween(startDate, endDate));
    }
  
    calculateNumberOfDays(startDate, endDate) {
      const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.round(Math.abs((end - start) / oneDay)); // Utilizar Math.floor() para redondear hacia abajo
      return diffDays + 1; // Include both start and end dates
    }
  
    calculateOccupiedDays(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
    
      return this.bookings.reduce((occupiedDays, booking) => {
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);
    
        if (bookingEnd >= start && bookingStart <= end) {
          const minDate = bookingStart > start ? bookingStart : start;
          const maxDate = bookingEnd < end ? bookingEnd : end;
          const diffDays = this.calculateNumberOfDays(minDate, maxDate);
          return occupiedDays + diffDays;
        }
    
        return occupiedDays;
      }, 0);
    }
  
    isOccupiedBetween(startDate, endDate) {
      return this.bookings.some(booking => {
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return bookingEnd >= start && bookingStart <= end;
      });
    }
  }





  
class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        if (!Number.isInteger(discount)) {
          throw new Error("Discount must be an integer");
        }
        this.room = room;
    }

    get fee() {
        const roomRate = this.room.rate;
        const discountedRate = roomRate - (roomRate * this.discount) / 100;
        return  discountedRate;
    }

    calculateNumberOfDays() {
        const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
        const checkInDate = new Date(this.checkIn);
        const checkOutDate = new Date(this.checkOut);
        const diffDays = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay));
        return diffDays + 1; // Include both check-in and check-out days
    }
}






  
  module.exports = {
    Room,
    Booking
  };
  