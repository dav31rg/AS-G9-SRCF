// SISTEMA DE RESERVAS DE CANCHAS - SIN SOLID
// no cumple S: toda la lógica (clientes, canchas, precios, disponibilidad) en una sola clase

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Court {
  id: number;
  name: string;
  type: 'FOOTBALL' | 'VOLLEYBALL' | 'BASKETBALL';
}

interface Reservation {
  id: number;
  customerId: number;
  courtId: number;
  date: string;
  startHour: number;
  endHour: number;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED';
}

// no cumple I (no hay interfaces, todo depende de esta clase concreta) ni D
// (usa sus propios arrays como "bd" en vez de depender de una abstracción)
export class ReservationSystem {
  private customers: Customer[] = [];
  private customerIdCounter = 1;

  private courts: Court[] = [
    { id: 1, name: 'Cancha de Fútbol', type: 'FOOTBALL' },
    { id: 2, name: 'Cancha de Vóley', type: 'VOLLEYBALL' },
    { id: 3, name: 'Cancha de Básquet', type: 'BASKETBALL' },
  ];

  private reservations: Reservation[] = [];
  private reservationIdCounter = 1;

  registerCustomer(name: string, email: string): Customer {
    const customer: Customer = { id: this.customerIdCounter++, name, email };
    this.customers.push(customer);
    return customer;
  }

  // no cumple O (if/else por tipo, cada deporte nuevo obliga a editar esto)
  // ni L (no hay subtipos de Court, todo se resuelve con el campo "type")
  private calculatePrice(courtId: number, startHour: number, endHour: number): number {
    const court = this.courts.find(c => c.id === courtId);
    if (!court) throw new Error('Cancha no encontrada');

    const hours = endHour - startHour;
    let pricePerHour = 0;

    if (court.type === 'FOOTBALL') {
      pricePerHour = 20;
    } else if (court.type === 'VOLLEYBALL') {
      pricePerHour = 15;
    } else if (court.type === 'BASKETBALL') {
      pricePerHour = 18;
    }

    return pricePerHour * hours;
  }

  // no cumple S: mezcla regla de negocio (solapamiento) con acceso a datos
  private isAvailable(courtId: number, date: string, startHour: number, endHour: number): boolean {
    return !this.reservations.some(r =>
      r.courtId === courtId &&
      r.date === date &&
      r.status !== 'CANCELLED' &&
      startHour < r.endHour &&
      endHour > r.startHour
    );
  }

  // no cumple S: valida, calcula precio y guarda todo en un mismo método
  createReservation(customerId: number, courtId: number, date: string, startHour: number, endHour: number): Reservation {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) throw new Error('El cliente no existe');

    const court = this.courts.find(c => c.id === courtId);
    if (!court) throw new Error('La cancha no existe');

    if (startHour >= endHour) throw new Error('Horario inválido');

    if (!this.isAvailable(courtId, date, startHour, endHour)) {
      throw new Error('La cancha no está disponible en ese horario');
    }

    const totalPrice = this.calculatePrice(courtId, startHour, endHour);

    const reservation: Reservation = {
      id: this.reservationIdCounter++,
      customerId,
      courtId,
      date,
      startHour,
      endHour,
      totalPrice,
      status: 'CONFIRMED',
    };

    this.reservations.push(reservation);

    return reservation;
  }

  cancelReservation(reservationId: number): void {
    const reservation = this.reservations.find(r => r.id === reservationId);
    if (!reservation) throw new Error('Reserva no encontrada');

    reservation.status = 'CANCELLED';
  }

  listCustomers(): Customer[] {
    return this.customers;
  }

  listCourts(): Court[] {
    return this.courts;
  }

  listReservations(): Reservation[] {
    return this.reservations;
  }
}

