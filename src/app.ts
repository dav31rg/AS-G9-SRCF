import promptSync from "prompt-sync";

import { Reserva } from "./entities/Reserva";
import { ReservaRepositoryMemoria } from "./repositories/ReservaRepositoryMemoria";
import { ReservaService } from "./services/ReservaService";

const prompt = promptSync();

const repository =
    new ReservaRepositoryMemoria();

const service =
    new ReservaService(repository);

const canchas = [
    "Cancha A",
    "Cancha B",
    "Cancha C"
];

console.log("===== RESERVA DE CANCHAS =====");

const nombre =
    prompt("Nombre del cliente: ");

console.log("\nSeleccione cancha:");

canchas.forEach((c, i) => {
    console.log(`${i + 1}. ${c}`);
});

const opcion = Number(
    prompt("Opción: ")
);

const fecha =
    prompt("Fecha (YYYY-MM-DD): ");

const hora =
    prompt("Hora (HH:mm): ");

const cantidadHoras = Number(
    prompt("Cantidad de horas: ")
);

const precioTotal = Number(
    prompt("Precio total: ")
);

const reserva = new Reserva(
    1,
    nombre,
    canchas[opcion - 1],
    fecha,
    hora,
    cantidadHoras,
    precioTotal
);

service.registrarReserva(reserva);

console.log("\nReserva registrada.");

console.log("\nListado de reservas:");

service.obtenerReservas().forEach(r => {

    console.log(
        `${r.cliente} | ${r.cancha} | ${r.fecha} ${r.hora}`
    );

});