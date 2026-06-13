import { Reserva } from "../entities/Reserva";
import { IReservaRepository } from "../repositories/IReservaRepository";

export class ReservaService {

    constructor(
        private repository: IReservaRepository
    ) {}

    registrarReserva(
        reserva: Reserva
    ): void {
        if (reserva.cantidadHoras <= 0) throw new Error("La cantidad de horas debe ser mayor a 0");
        if (reserva.precioTotal < 0) throw new Error("El precio total no puede ser negativo");
        this.repository.guardar(reserva);
    }

    obtenerReservas(): Reserva[] {
        return this.repository.listar();
    }

    buscarPorCliente(cliente: string): Reserva[] {
        return this.repository.listar().filter(r => r.cliente === cliente);
    }

    
}