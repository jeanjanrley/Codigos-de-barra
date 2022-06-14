import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../services/.firebase";
import { CategoriaTypes } from "../../types/types";
import "./styles.scss";

export function ModaladdFragrancia() {
	const [fragrancia, setFragrancia] = useState<string>();

	const fragranciaExitVerify = useCallback(async () => {
		if (fragrancia) {
			try {
				const referencia = collection(db, "categorias");
				const querySnapshot = query(referencia, where("nome", "==", fragrancia));
				const snapshot = await getDocs(querySnapshot);
				return !snapshot.empty;
			} catch (error) {
				console.log(error);
			}
		}
	}, [fragrancia]);

	const handleSubmit = useCallback(async () => {
		if (fragrancia) {
			try {
				const referencia = collection(db, "categorias");
				const doc: CategoriaTypes = {
					nome: fragrancia
				};
				await addDoc(referencia, doc);
				Swal.fire("Sucesso", "Categoria adicionada com sucesso", "success");
			} catch (error) {
				console.log(error);
				Swal.fire("Erro", "Erro ao adicionar categoria", "error");
			}
		}
	}, [fragrancia]);

	const middelware = useCallback(async () => {
		if (!fragrancia || fragrancia.length < 3) {
			Swal.fire("Erro", "A fragrancia deve ter no mínimo 3 caracteres", "error");
			return;
		}
		const result = await fragranciaExitVerify();
		if (result) {
			Swal.fire("Erro", "Fragrancia já cadastrada", "error");
			return;
		}
		handleSubmit();
	}, [fragrancia, fragranciaExitVerify, handleSubmit]);

	return (
		<div className="modal-container">
			<div className="modal-content">
				<label htmlFor="fragrancia">Fragrancia</label>
				<input
					type="text"
					placeholder="Ex: Flor de cerejeira"
					onChange={event => setFragrancia(event.target.value)}
				/>
				<button
					type="button"
					onClick={middelware}
				>Adicionar</button>
			</div>
		</div>
	);
}