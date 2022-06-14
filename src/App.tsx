import React, { } from "react";
import "./App.scss";
import { CondigoItem } from "./components/condigoItem";
import { FilterBox } from "./components/filterBox";
import { CategoriaTypes } from "./types/types";

function App() {
	const [selectedCategoria, setSelectedCategoria] = React.useState<CategoriaTypes>();


	return (
		<div className="App">
			<div className="container">
				<div className="title">
					<div className="title-box">
						<div className="title-text">
							Código de barras
						</div>
						<div className="filters-box">
							<FilterBox title="Categoria" setSelectedCategoria={setSelectedCategoria} />
							<FilterBox title="Fragrancia" setSelectedCategoria={setSelectedCategoria} />
						</div>
					</div>
					<div className="horizontal-division" />
				</div>
				<div className="codigos-area">
					<div className="header">
						<div className="content-area">
							<div className="header-item options">
								Opções
							</div>
							<div className="header-item title-item">
								Item
							</div>
							<div className="header-item">
								Códigos
							</div>
						</div>
					</div>
					<div className="items-area">
						<CondigoItem />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
