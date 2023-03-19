const { inquirerMenu, pausa, leerInput,listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
    let opt = 0;
    const busquedas = new Busquedas();

    
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const ciudad = await leerInput('Ciudad: ')
                // Buscar el lugar
                const lugares = await busquedas.ciudad (ciudad);
                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                if(id === '0') continue;
                const lugarSel = lugares.find( l => l.id === id)
                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);
                // Datos clima 
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                //  Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', `${lugarSel.nombre}`.green);
                console.log('Latitud: ', `${lugarSel.lat}`.yellow);
                console.log('Longitud: ', `${lugarSel.lng}`.yellow);
                console.log('Temperatura: ', `${clima.temp}`.yellow);
                console.log('Minima: ', `${clima.min}`.yellow);
                console.log('Maxima: ', `${clima.max}`.yellow);
                console.log('Como esta el clima: ', clima.desc.green);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) =>{
                    const idx = `${i +1}`.green
                    console.log(`${idx} ${lugar}`);
                })
                break;

        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
}


main()