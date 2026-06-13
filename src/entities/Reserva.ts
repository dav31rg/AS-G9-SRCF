export class Reserva {
    constructor(
        public id: number,
        public cliente: string,
        public cancha: string,
        public fecha: string,
        public hora: string
    ) {}
}