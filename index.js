import fs from "fs/promises";
const args = process.argv.slice(2);

let objetoDatos = {};

const leerArchivo = async () => {
	try {
		let autos = await fs.readFile("autos.json");
		if (autos.length == 0) {
			return console.log("El archivo se encuentra vacio");
		}
		autos = JSON.parse(autos);
		if (args[1] !== undefined) {
			for (let auto in autos) {
				if (auto == args[1]) {
					console.log(autos[auto]);
				}
			}
		} else {
			console.log(autos);
		}
	} catch (error) {
		console.log("Lo sentimos, ha ocurrido un error");
		console.log(error);
	}
};

const escribirDatos = async () => {
	if (args.length == 1) {
		console.log("Ingrese más parámetros")
		return;
	}
	try {
		let autos = await fs.readFile("autos.json");
		let nuevoObjeto;
		if (autos.length !== 0) {
			autos = JSON.parse(autos);
		}
		for (let auto in autos) {
			if (auto == args[0]) {
				for (let propiedad in autos[auto]) {
					if (propiedad == args[1]) {
						autos[auto][propiedad] = args[2];
						nuevoObjeto = autos;
						console.log(`Propiedad ${args[1]} del auto ${args[0]} ha sido modificada a ${args[2]}`);
					}
				}
				if (nuevoObjeto == undefined) {
					autos[auto] = { ...autos[auto], [args[1]]: args[2] };
					console.log(`Propiedad ${args[1]} del auto ${args[0]} ha sido agregada a ${args[2]}`);
				}
			}
		}
		//console.log(autos);
		await fs.writeFile("autos.json", JSON.stringify(autos, null, 2));
		console.log("Los datos han sido agregados exitosamente");
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
