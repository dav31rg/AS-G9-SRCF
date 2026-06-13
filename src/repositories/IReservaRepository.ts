import { Reserva } from "../entities/Reserva";

export interface IReservaRepository {
    guardar(reserva: Reserva): void;
    listar(): Reserva[];
}