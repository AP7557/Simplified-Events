import React, { useState } from "react";
import { token } from "./Auth";
import List from "./List";
export default function Remove() {
	let [remove, setRemove] = useState("");
	let [IDs, setIDs] = useState("");

	const removingEvent = async () => {
		let result = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events/${IDs}?key=${process.env.REACT_APP_API_KEY}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			}
		);
		if (!result.ok) {
			alert(`Error Occured Code: ${result.status}`);
		} else {
			document.body.style.backgroundColor = "#039be5";
			alert(`${remove} Event Successfully Removed`);
			setRemove("")
		}
	};
	const removing = (e) => {
		e.preventDefault();
		try {
			removingEvent();
		} catch (error) {
			alert(error);
		}
	};
	const afterValue = (v, currentEventID, currentEventColor) => {
		setIDs(currentEventID);
		document.body.style.backgroundColor = currentEventColor || "#039be5";
		setRemove(v);
	};
	return (
		<div>
			<h4 id="rem">Event Name Which You Want to REMOVE:</h4>
			<input
				type="text"
				value={remove}
				onChange={(e) => {
					setRemove(e.target.value);
				}}
			/>
			<br />
			<input type="submit" value="Submit" onClick={removing} />
			<center>
				<div>{remove && <List afterValue={afterValue} preName={remove} />}</div>
			</center>
		</div>
	);
}
