import React from "react";
import Select from "react-select";
const options = [
	{ value: "S", label: "Single Day" },
	{ value: "MO", label: "Every Monday" },
	{ value: "TU", label: "Every Tuesday" },
	{ value: "WE", label: "Every Wednesday" },
	{ value: "TH", label: "Every Thursday" },
	{ value: "FR", label: "Every Friday" },
	{ value: "SA", label: "Every Saturday" },
	{ value: "SU", label: "Every Sunday" },
];

export default function Recurrence({show, value, editRecurrence}) {
	return (
		<div
			id="recurrence"
			style={{ display: show === true ? "none" : "block" }}>
			<Select
				isMulti
				type="text"
				id="recurDisplay"
				value={value}
				onChange={(e) => {
					editRecurrence(e);
				}}
				options={options}
			/>
		</div>
	);
}
