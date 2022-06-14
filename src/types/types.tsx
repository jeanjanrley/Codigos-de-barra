
// Ex: Aromatizante, Difusor
export interface CategoriaTypes {
	id?: string;
	nome: string;
}

export interface ValueTypes<referencia = unknown | any> {
	label: string;
	value: referencia;
}

// Ex: bamboo, Mãe Terra
export interface FragranciaTypes {
	id?: string;
	nome: string;
}

// Ex:  Kg, Litro
export interface VolumeTypes {
	id?: string;
	quantidade: number;
	tipo: "Kg" | "L" | "Ml" | "Mg" | "G";
}

// Ex: Aromatizante de Bamboo - 200 ml
export interface ProdutoTypes {
	id?: string;
	categoria: string;
	fragrancia: string;
	codigo: number;
	valoumes: string[];
}

// Ean: 13
export interface CodigoTypes {
	id?: string;
	number: number;
}
