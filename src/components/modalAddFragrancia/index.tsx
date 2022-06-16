import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../services/.firebase";
import { CategoriaTypes } from "../../types/types";
import "./styles.scss";

interface ModalAddFragranciaProps {
	setShowAddFragrancia: Dispatch<SetStateAction<boolean>>
}

export function ModalAddFragrancia({ setShowAddFragrancia }: ModalAddFragranciaProps) {
	const [fragrancia, setFragrancia] = useState<string>();

	const fragranciaExitVerify = useCallback(async () => {
		if (fragrancia) {
			try {
				const referencia = collection(db, "fragrancia");
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
				const referencia = collection(db, "fragrancias");
				const doc: CategoriaTypes = {
					nome: fragrancia
				};
				await addDoc(referencia, doc);
				Swal.fire("Sucesso", "Fragrância adicionada com sucesso", "success");
				setShowAddFragrancia(false);
			} catch (error) {
				console.log(error);
				Swal.fire("Erro", "Erro ao adicionar fragrância", "error");
			}
		}
	}, [fragrancia, setShowAddFragrancia]);

	const middelware = useCallback(async () => {
		if (!fragrancia || fragrancia.length < 3) {
			Swal.fire("Erro", "A fragrância deve ter no mínimo 3 caracteres", "error");
			return;
		}
		const result = await fragranciaExitVerify();
		if (result) {
			Swal.fire("Erro", "Fragrância já cadastrada", "error");
			return;
		}
		handleSubmit();
	}, [fragrancia, fragranciaExitVerify, handleSubmit]);

	async function handleClose() {
		await Swal.fire({
			title: "Atenção",
			text: "Deseja realmente sair? Os dados não salvos serão perdidos",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sim",
			cancelButtonText: "Não"
		}).then(async (result) => {
			if (result.value) {
				setShowAddFragrancia(false);
			}
		}).catch(() => {
			Swal.fire("Erro", "Houve um erro ao fechar o modal", "error");
		});
	}

	return (
		<div className="modal-container">
			<div className="modal-content">
				<div className="modal-header">
					<div className="close-button" onClick={handleClose}>
						X
					</div>
				</div>
				<div className="modal-form">
					<label htmlFor="fragrancia">Fragrância</label>
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
		</div>
	);
}