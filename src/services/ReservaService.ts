import { Reserva } from "../entities/Reserva";
import { IReservaRepository } from "../repositories/IReservaRepository";

export class ReservaService {

    constructor(
        private repository: IReservaRepository
    ) {}

    registrarReserva(
        reserva: Reserva
    ): void {

        this.repository.guardar(reserva);
    }

    obtenerReservas(): Reserva[] {
        return this.repository.listar();
    }
}