import { Reserva } from "../entities/Reserva";
import { IReservaRepository } from "./IReservaRepository";

export class ReservaRepositoryMemoria
implements IReservaRepository {

    private reservas: Reserva[] = [];

    guardar(reserva: Reserva): void {
        this.reservas.push(reserva);
    }

    listar(): Reserva[] {
        return this.reservas;
    }
}