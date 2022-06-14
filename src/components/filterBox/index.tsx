import "./styles.scss";
import Select, { GroupBase, StylesConfig } from "react-select";
import { collection, addDoc, getDocs } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import Swal from "sweetalert2";
import { db } from "../../services/.firebase";
import { CategoriaTypes, ValueTypes } from "../../types/types";

interface FilterBoxProps {
	title: string;
	setSelectedCategoria: Dispatch<SetStateAction<CategoriaTypes | undefined>>
}

const selectStyles: StylesConfig<ValueTypes, false, GroupBase<ValueTypes>> = {
	container: (provided) => ({
		...provided,
		flexGrow: 1,
		height: "38px",
		minWidth: "300px",
	}),
	control: (provided) => ({
		...provided,
		height: "100%",
		width: "100%",
		fontSize: "12pt",
	}),
};

export function FilterBox({ title, setSelectedCategoria }: FilterBoxProps) {
	const [categorias, setCategorias] = React.useState<CategoriaTypes[]>([]);
	const [optionsCategorias, setOptionsCategorias] = React.useState<ValueTypes<CategoriaTypes>[]>();

	const adicionarCategoria = useCallback(async () => {
		try {
			const referencia = collection(db, "categorias");
			const doc: CategoriaTypes = {
				nome: "Aromatizantes",
			};
			const snapshot = await addDoc(referencia, doc);
			Swal.fire("Sucesso", "Categoria adicionada com sucesso", "success");
		} catch (error) {
			console.log(error);
			Swal.fire("Erro", "Erro ao adicionar categoria", "error");
		}
	}, []);

	const getCategorias = useCallback(async () => {
		try {
			const referencia = collection(db, "categorias");
			const snapshot = await getDocs(referencia);
			const letCategorias = snapshot.docs.map((doc) => {
				return {
					...doc.data(),
					id: doc.id
				} as CategoriaTypes;
			});
			setCategorias(letCategorias);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		getCategorias();
	}, [getCategorias]);

	useEffect(() => {
		if (categorias) {
			const options = categorias.map(letCategoria => {
				return {
					value: letCategoria.nome,
					label: letCategoria.nome,
				} as ValueTypes;
			});
			setOptionsCategorias(options);
		}
	}, [categorias]);

	return (
		<div className="filter-box">
			<label>{title}</label>
			<Select
				styles={selectStyles}
				options={optionsCategorias}
				onChange={event => event ? setSelectedCategoria(event?.value) : null}
			/>
		</div>
	);
}