import React, { useEffect } from "react";

export default function Color(props) {
	// useEffect(() => {
	// 	var ele = document.getElementById("colorChoice");
	// 	ele.checked = false;
	// }, []);
	return (
		<div
			className="choice"
			onClick={(e) => {
				props.colorPicker(e.target.value);
			}}>
			<input
				type="radio"
				name="Choose"
				value="1"
				onClick={() => {
					document.body.style.backgroundColor = "#7986cb";
				}}
			/>
			<label htmlFor="colorChoice">Lavender</label>

			<input
				type="radio"
				name="Choose"
				value="2"
				onClick={() => {
					document.body.style.backgroundColor = "#33b679";
				}}
			/>
			<label htmlFor="colorChoice">Sage</label>

			<input
				type="radio"
				name="Choose"
				value="3"
				onClick={() => {
					document.body.style.backgroundColor = "#8e24aa";
				}}
			/>
			<label htmlFor="colorChoice">Grape</label>

			<input
				type="radio"
				name="Choose"
				value="4"
				onClick={() => {
					document.body.style.backgroundColor = "#e67c73";
				}}
			/>
			<label htmlFor="colorChoice">Flamingo</label>

			<input
				type="radio"
				name="Choose"
				value="5"
				onClick={() => {
					document.body.style.backgroundColor = "#f6c026";
				}}
			/>
			<label htmlFor="colorChoice">Banana</label>

			<input
				type="radio"
				name="Choose"
				value="6"
				onClick={() => {
					document.body.style.backgroundColor = "#f5511d";
				}}
			/>
			<label htmlFor="colorChoice">Trangerine</label>

			<input
				type="radio"
				name="Choose"
				value="7"
				onClick={() => {
					document.body.style.backgroundColor = "#039be5";
				}}
			/>
			<label htmlFor="colorChoice">Peacock</label>

			<input
				type="radio"
				name="Choose"
				value="8"
				onClick={() => {
					document.body.style.backgroundColor = "#616161";
				}}
			/>
			<label htmlFor="colorChoice">Graphite</label>

			<input
				type="radio"
				name="Choose"
				value="9"
				onClick={() => {
					document.body.style.backgroundColor = "#3f51b5";
				}}
			/>
			<label htmlFor="colorChoice">Blueberry</label>

			<input
				type="radio"
				name="Choose"
				value="10"
				onClick={() => {
					document.body.style.backgroundColor = "#0b8043";
				}}
			/>
			<label htmlFor="colorChoice1">Basil</label>

			<input
				type="radio"
				name="Choose"
				value="11"
				onClick={() => {
					document.body.style.backgroundColor = "#d60000";
				}}
			/>
			<label htmlFor="colorChoice">Tomato</label>
		</div>
	);
}
