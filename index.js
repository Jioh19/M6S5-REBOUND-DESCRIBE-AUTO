import fs from "fs/promises";
const args = process.argv.slice(2);

let objetoDatos = {};

const leerArchivo = async () => {
	try {
		const autos = await fs.readFile("autos.json");
		if (autos.length == 0) {
			return console.log("El archive se encuentra vacio");
		}
		console.log(JSON.parse(autos));
	} catch (error) {
		console.log("Lo sentimos, ha ocurrido un error");
		console.log(error);
	}
};

const escribirDatos = async () => {
	try {
		const datos = await fs.readFile("autos.json");
		if (datos.length !== 0) {
			objetoDatos = JSON.parse(datos);
		}
		const nuevoObjeto = { ...objetoDatos};
		await fs.writeFile("datos.txt", JSON.stringify(nuevoObjeto, null, 2));
		console.log("Los datos hsn sido agregados exitosamente");
	} catch (error) {
		console.log("Lo sentimos, ha ocurrido un error");
		console.log(error);
	}
};

const verificarOpcionEntrada = () => {
	if (args[0] == "leer") {
		return leerArchivo();
	} else {
		return escribirDatos();
	}
};

const verificaParametrosEntrada = () => {
	if (args.length == 0) {
		console.log("Debes ingresar un color y un puntaje para agregar o modificar datos en archivo datos.txt");
		console.log("También puedes pasar la opción leer, para conocer el contenido del archivo datos.txt");
		return process.exit();
	}
};
verificarOpcionEntrada();
verificaParametrosEntrada();
