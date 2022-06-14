import React from "react";
import "./styles.scss";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GrSave } from "react-icons/gr";


export function CondigoItem() {
	return (
		<div className="item-component">
			<div className="content-area">
				<div className="header-item options">
					<div className="icon-button">
						<FiEdit size={18} color="#ccc" />
					</div>
					<div className="icon-button">
						<GrSave size={18} color="#ccc" />
					</div>
					<div className="icon-button">
						<FiTrash2 size={18} color="#ccc" />
					</div>
				</div>
				<div className="header-item title-item">
					Aromatizante, Cereja e Aveia
				</div>
				<div className="header-item">
					Códigos
				</div>
			</div>
		</div>
	);
}