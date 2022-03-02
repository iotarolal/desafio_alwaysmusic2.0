//import pg from 'pg'
const {Client } = require('pg');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');

//const client = new Client({
//	connectionString: 'postgresql://postgres:1234@localhost:5432/jeans'
//});

// conexiones

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'alwaysmusic',
    password: '1234',
    port: 5432
})

client.connect(err=>{

	if (err) {
		console.log('Eror en la conexion postgres', error);
	}
})


console.log('todo fue exitoso');

//  Procces

// Obtengo datos
const comando = process.argv[2];
const para3 =process.argv[3];  // nombre o rut
const para4 = process.argv[4];  // rut
const para5 = process.argv[5];   // curso
const para6 = Number(process.argv[6]);  // nivel


if (comando == 'nuevo' ||  comando == 'editar') {    

    if (process.argv.length < 6) {
        console.log('Faltan argumentos para la ejecucion');
        process.exit(1);
    }

    // valido nivel
    if (typeof para6 != 'number') {
        process.exit(1);
    }

    if (comando == 'nuevo') {
        nuevoestudiante();
    }else{
        editaestudiante();
    }

} else if (comando == 'consulta') {
    consultaestudiante();

} else if (comando == 'eliminar') {
    eliminaestudiante(process.argv[3]);

} else if (comando == 'rut') {
    Consultarut();
} else {
    console.log('comando desconocido')
    process.exit(1);
}    

// funciones
// ingreso un nuevo estudiante
async function nuevoestudiante () {
	const res = await client.query(
	`insert into estudiantes (nombre, rut, curso, nivel ) values ('${para3}','${para4}', '${para5}', '${para6}') returning *`
    )
	console.log('Resultado', res.rows);
    client.end()
}

// modifico un estudiante
async function editaestudiante () {
	const res = await client.query(
	`update estudiantes set nombre = '${para3}' , curso = '${para5}' , nivel = '${para6}' where rut = '${para4}'`
    )
	console.log('Resultado', res.rows);
    client.end()
}

// consulta tabla estudiante (all)
async function consultaestudiante() {
    const res = await client.query(`select * from estudiantes`);
    console.log('Resultado', res.rows);
//    console.log('Columnas', res.fields);
    client.end()
}

// consulta estudiante por rut
async function Consultarut() {
    const res = await client.query(`select * from estudiantes where rut = '${para3}'`)
    console.log('Resultado', res.rows);
    client.end()
}

// elimina estudiante por rut
async function eliminaestudiante(rut) {
    const res = await client.query(`delete from estudiantes where rut = '${rut}'`)
//    console.log('Resultado', res.rows);
    client.end()
}



//CREATE TABLE estudiantes (
//    rut varchar(255) PRIMARY KEY,
//    nombre varchar(255) NOT NULL,
//    curso varchar(255) NOT NULL,
//    nivel integer  NOT NULL
//);
