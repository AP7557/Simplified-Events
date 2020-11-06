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

export default function Recurrence(props) {
	return (
		<div
			id="recurrence"
			style={{ display: props.u === true ? "none" : "block" }}>
			<Select
				isMulti
				type="text"
				id="recur"
				value={props.value}
				onChange={(e) => {
					props.recur(e);
				}}
				options={options}
			/>
		</div>
	);
}
