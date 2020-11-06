import React, { useState } from "react";
import { token } from "./Auth";

export default function Remove() {
	let [remove, setRemove] = useState("");
	const getEvent = async () => {
		let result = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${remove}&key=${process.env.REACT_APP_AUTO_EVENTS_API_KEY}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			}
		);
		let r = await result.json();
		return r.items[r.items.length - 1];
	};
	const removingEvent = async (id) => {
		let result = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}?key=${process.env.REACT_APP_AUTO_EVENTS_API_KEY}`,
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
			alert(`${remove} Event Successfully Removed`);
		}
	};
	const removing = (e) => {
        e.preventDefault();
        try {
            getEvent()
			.then((result) => {
                if (result === undefined) {
                    throw new Error("Id not valid")
                }
				removingEvent(result.id);
			})
			.catch((error) => {
				alert(error);
			});
        } catch (error) {
            console.log(error)
        }

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
			/><br/>
			<input type="submit" value="Submit" onClick={removing} />
		</div>
	);
}
