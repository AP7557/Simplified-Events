import React, { useState } from "react";
import Select from "react-select";
import Recurrence from "./Recurrence";
import { token } from "./Auth";
import Remove from "./Remove";
import List from "./List";

const options = [
	{ value: "summary", label: "Edit Summary" },
	{ value: "description", label: "Edit Description" },
	{ value: "start", label: "Edit Start-Time" },
	{ value: "end", label: "Edit End-Time" },
	{ value: "location", label: "Edit Location" },
	{ value: "recurrence", label: "Edit Recurrence" },
];
const colors = [
	"#7986cb",
	"#33b679",
	"#8e24aa",
	"#e67c73",
	"#f6c026",
	"#f5511d",
	"#039be5",
	"#616161",
	"#3f51b5",
	"#0b8043",
	"#d60000",
];
let data = {};
let days = "";
let recurrence = [];
let submit;
export default function changeevent() {
	let [preEvent, setpreEvent] = useState({
		preE: "",
		preEs: "",
	});
	let [event, setEvent] = useState({
		summary: "",
		description: "",
		start: "",
		end: "",
		location: "",
		recurrence: "",
		until: "",
	});
	let [recurs, setrecurs] = useState(true);

	const getEvent = async () => {
		let result = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${preEvent.preE}&key=${process.env.REACT_APP_AUTO_EVENTS_API_KEY}`,
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

	const updatingEvent = async (id) => {
		let result = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}?key=${process.env.REACT_APP_AUTO_EVENTS_API_KEY}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		if (!result.ok) {
			alert(
				`Please make sure the required\n("Event Name","Start/End Time" and "Recurrence(if not single day then also 'Until')")\nfields are completed`
			);
		} else {
			const r = await result.json();
			alert(`${r.summary} Event Successfully Updated`);
		}
	};

	const updating = (e) => {
		e.preventDefault();
		try {
			getEvent()
				.then((result) => {
					if (result === undefined) {
						throw new Error("Id not valid");
					}
					let id = result.id;
					document.body.style.backgroundColor =
						colors[result.colorId];
					return id;
				})
				.then((id) => {
					for (const key in event) {
						if (event[key] !== "") {
							if (key === "start" || key === "end") {
								data[key][
									"dateTime"
								] = `${event[key]}:00-05:00`;
								data[key]["timeZone"] = "America/New_York";
							} else if (key === "recurrence") {
								if (event[key][0].value !== "S") {
									event[key].forEach((e) => {
										days += e.value + ",";
									});
									days = days.substring(0, days.length - 1);
									recurrence = [
										`RRULE:FREQ=WEEKLY;UNTIL=${event.until.replace(
											/-/g,
											""
										)};BYDAY=${days}`,
									];
									data["recurrence"] = recurrence;
									break;
								} else {
									data["recurrence"] = "";
									break;
								}
							} else {
								data[key] = event[key];
							}
						}
					}
					return id;
				})
				.then((id) => {
					updatingEvent(id);
				})
				.catch((error) => {
					alert(error);
				});
		} catch (error) {
			alert(error);
		}

		setpreEvent(() => {
			return {
				preE: "",
				preEs: "",
			};
		});
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
	};
	const change = (e) => {
		try {
			event = document.getElementsByClassName("event");
			[...event].forEach((a) => {
				a.style.display = "none";
			});
			setrecurs(true);
			submit = document.getElementById("submit");
			e.forEach((i) => {
				switch (i.value) {
					case "summary":
						event = document.getElementsByClassName("summary");
						[...event].forEach((a) => {
							a.style.display = " block";
						});
						submit.style.display = "block";
						break;
					case "description":
						event = document.getElementsByClassName("description");
						[...event].forEach((a) => {
							a.style.display = " block";
						});
						submit.style.display = "block";
						break;
					case "start":
						event = document.getElementsByClassName("start");
						[...event].forEach((a) => {
							a.style.display = " block";
						});
						submit.style.display = "block";
						break;
					case "end":
						event = document.getElementsByClassName("end");
						[...event].forEach((a) => {
							a.style.display = " block";
						});
						submit.style.display = "block";
						break;
					case "location":
						event = document.getElementsByClassName("location");
						[...event].forEach((a) => {
							a.style.display = " block";
						});
						submit.style.display = "block";
						break;
					case "recurrence":
						event = document.getElementsByClassName("recurrence");
						[...event].forEach((a) => {
							a.style.display = " block";
						});
						setrecurs(false);
						submit.style.display = "block";
						break;
					default:
				}
			});
		} catch (error) {}
	};

	const recur = (r) => {
		setEvent((prevState) => {
			return { ...prevState, recurrence: r };
		});
	};
	return (
		<div className="all3">
			<center>
				<form className="remove">
					<Remove></Remove>
				</form>
			</center>
			<center className="update">
				<form>
					<h4 id="cha">Event Name Which You Want to Change:</h4>
					<input
						type="text"
						id="change"
						value={preEvent.preE}
						onChange={(e) => {
							const s = e.target.value;
							setpreEvent((prevState) => {
								return { ...prevState, preE: s };
							});
						}}
					/>
					<h4>Event Attributes You Want to Change:</h4>
					<Select
						isMulti
						required
						id="recur"
						type="text"
						value={preEvent.preEs}
						onChange={(e) => {
							change(e);
							setpreEvent((prevState) => {
								return { ...prevState, preEs: e };
							});
						}}
						options={options}
					/>
					<h4 className="event summary" style={{ display: "none" }}>
						Event Name:
					</h4>
					<input
						type="text"
						className="event summary"
						style={{ display: "none" }}
						value={event.summary}
						placeholder="Required"
						onChange={(e) => {
							const s = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, summary: s };
							});
						}}
					/>
					<h4
						className="event description"
						style={{ display: "none" }}>
						Description:
					</h4>
					<input
						type="text"
						className="event description"
						style={{ display: "none" }}
						value={event.description}
						onChange={(e) => {
							const d = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, description: d };
							});
						}}
					/>
					<br />
					<h4 className="event start" style={{ display: "none" }}>
						Start Time[EST]:
					</h4>
					<input
						type="datetime-local"
						className="event start"
						style={{ display: "none" }}
						value={event.start}
						onChange={(e) => {
							const s = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, start: s };
							});
						}}
					/>
					<br />
					<h4 className="event end" style={{ display: "none" }}>
						End Time[EST]:
					</h4>
					<input
						type="datetime-local"
						className="event end"
						style={{ display: "none" }}
						value={event.end}
						onChange={(e) => {
							const ed = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, end: ed };
							});
						}}
					/>
					<br />
					<h4 className="event location" style={{ display: "none" }}>
						Location:
					</h4>
					<input
						type="text"
						className="event location"
						style={{ display: "none" }}
						value={event.location}
						onChange={(e) => {
							const l = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, location: l };
							});
						}}
					/>
					<br />
					<h4
						className="event recurrence"
						style={{ display: "none" }}>
						Recurrence:
					</h4>
					<Recurrence
						recur={recur}
						value={event.recurrence}
						u={recurs}></Recurrence>

					<div
						className="event recurrence"
						style={{ display: "none" }}>
						Until:
					</div>
					<input
						type="date"
						className="event recurrence"
						style={{ display: "none" }}
						value={event.until}
						onChange={(e) => {
							const u = e.target.value;
							setEvent((prevState) => {
								return { ...prevState, until: u };
							});
						}}
					/>
					<br />

					<input
						type="submit"
						className="event"
						id="submit"
						style={{ display: "none" }}
						value="Submit"
						onClick={updating}
					/>
				</form>
			</center>
			<center>
				<div>
					{preEvent.preE && <List></List>}
				</div>
			</center>
		</div>
	);
}
