import React from "react";

const style = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
	backgroundColor: "#FFF",
	padding: "50px",
	zIndex: 1000,
};

const overlay = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0,0,0,.7)",
	zIndex: 1000,
};

export default function SingleList({ open, singleEvent, onClose }) {
	let [recurrence, start, end, description, location] = "";

	if (!open) {
		return null;
	}

	//format the start and end time
	let date = singleEvent.start.indexOf("T");
	start = `Date: ${singleEvent.start.slice(
		0,
		date
	)} || Time: ${singleEvent.start.slice(date + 1)}`;
	date = singleEvent.end.indexOf("T");
	end = `Date: ${singleEvent.end.slice(
		0,
		date
	)} || Time: ${singleEvent.end.slice(date + 1)}`;

	//if recurrence is not single day then format the recurrence
	if (singleEvent.recurrence !== "Single Day") {
		let days = singleEvent.recurrence.indexOf("BYDAY=") + 6;
		recurrence = "Days: " + singleEvent.recurrence.slice(days);
		//if its includes until format accordingly
		if (singleEvent.recurrence.includes("UNTIL=")) {
			let until = singleEvent.recurrence.indexOf("UNTIL=") + 6;
			until = singleEvent.recurrence.slice(until, days - 7);
			until =
				until.slice(0, 4) + "-" + until.slice(4, 6) + "-" + until.slice(6, 8);
			recurrence = `Days: ${singleEvent.recurrence.slice(
				days
			)} || Until: ${until}`;
		}
	} else {
		recurrence = singleEvent.recurrence;
	}
	//check if its undefined then just print ""
	typeof singleEvent.description !== "undefined"
		? (description = singleEvent.description)
		: (description = "");

	typeof singleEvent.location !== "undefined"
		? (location = singleEvent.location)
		: (location = "");

	return (
		<div style={overlay}>
			<div style={style}>
				<button onClick={onClose}>Close</button>
				<br />
				{`Summary = ${singleEvent.summary}`}
				<br />
				{`Description = ${description}`}
				<br />
				{`Start = ${start}`}
				<br />
				{`End = ${end}`}
				<br />
				{`Location = ${location}`}
				<br />
				{`Recurrence = ${recurrence}`}
				<br />
			</div>
		</div>
	);
}
