import React, { useState } from "react";
import Color from "./Color";
import Recurrence from "./Recurrence";
import { token } from "./Auth";

let data;
const date = new Date();
let days = "";
let recurrence = [];

export default function AddEvent() {
	let [event, setEvent] = useState({
		summary: "",
		description: "",
		start: "",
		end: "",
		location: "",
		recurrence: "",
		until: "",
		color: "",
	});
	const adding = (e) => {
		e.preventDefault();
		data = {
			summary: event.summary,
			description: event.description,
			location: event.location,
			start: {
				timeZone: "America/New_York",
			},
			end: {
				timeZone: "America/New_York",
			},
			colorId: event.color || 1,
		};

		if (event.start === "") {
			data["start"]["dateTime"] = date.toISOString();
		} else {
			data["start"]["dateTime"] = `${event.start}:00-05:00`;
		}

		if (event.end === "") {
			data["end"]["dateTime"] = date.toISOString();
		} else {
			data["end"]["dateTime"] = `${event.end}:00-05:00`;
		}

		try {
			if (event.recurrence[0].value !== "S") {
				console.log(event.recurrence);
				event.recurrence.forEach((e) => {
					days += e.value + ",";
				});
				days = days.substring(0, days.length - 1);
				recurrence = [
					`RRULE:FREQ=WEEKLY;UNTIL=${event.until.replace(
						/-/g,
						""
					)};BYDAY=${days}`,
				];
				console.log(recurrence);
				data["recurrence"] = recurrence;
			}
		} catch (error) {
			event.recurrence = { value: "S", label: "Single Day" };
		}

		setEvent(() => {
			return {
				summary: "",
				description: "",
				start: "",
				end: "",
				location: "",
				recurrence: "",
				until: "",
				color: "",
			};
		});

		addEvent();
	};
	const addEvent = async () => {
		const resp = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${process.env.REACT_APP_AUTO_EVENTS_API_KEY}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		if (!resp.ok) {
			alert(
				`Please make sure the required\n("Event Name","Start/End Time" and "Recurrence")\nfields are completed`
			);
		} else {
			const r = await resp.json();
			alert(`${r.summary} Event Successfully Added`);
		}
	};

	const colorPicker = (c) => {
		setEvent((prevState) => {
			return { ...prevState, color: c };
		});
	};

	const recur = (r) => {
		setEvent((prevState) => {
			return { ...prevState, recurrence: r };
		});
	};
	return (
		<>
			<form>
				<center>
					<h4>Event Name(Required):</h4>
					<input
						type="text"
						value={event.summary}
						onChange={(e) => {
							const s = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, summary: s };
							});
						}}
					/>
					<br />
					<h4>Description:</h4>
					<input
						type="text"
						value={event.description}
						onChange={(e) => {
							const d = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, description: d };
							});
						}}
					/>
					<br />
					<h4>Start Time[EST]:</h4>
					<input
						type="datetime-local"
						value={event.start}
						onChange={(e) => {
							const s = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, start: s };
							});
						}}
					/>
					<br />
					<h4>End Time[EST]:</h4>
					<input
						type="datetime-local"
						value={event.end}
						onChange={(e) => {
							const ed = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, end: ed };
							});
						}}
					/>
					<br />
					<h4>Location:</h4>
					<input
						type="text"
						value={event.location}
						onChange={(e) => {
							const l = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, location: l };
							});
						}}
					/>
					<br />
					<h4>Recurrence:</h4>
					<Recurrence
						recur={recur}
						value={event.recurrence}></Recurrence>
					Until:
					<input
						type="date"
						value={event.until}
						onChange={(e) => {
							const u = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, until: u };
							});
						}}
					/>
					<br />
					<h4>Color:</h4>
				</center>
				<div className="container">
					<Color colorPicker={colorPicker} />
					<br />
				</div>
				<center>
					<input type="submit" value="Submit" onClick={adding} />
				</center>
			</form>
		</>
	);
}

export { data };
