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

export default function changeevent() {
	let data = {};
	let days = "";
	let recurrence = [];

	//preName=event & preAttributes=what needs to change
	let [preEvent, setpreEvent] = useState({
		preName: "",
		preAttributes: "",
	});
	let [IDs, setIDs] = useState("");
	let [events, setEvents] = useState({
		summary: "",
		description: "",
		start: "",
		end: "",
		location: "",
		recurrence: "",
		until: "",
	});
	//display/hide recurrence field
	let [recuring, setRecuring] = useState(true);

	//update the event
	const updatingEvent = async () => {
		let result = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/primary/events/${IDs}?key=${process.env.REACT_APP_API_KEY}`,
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
			alert("Something Went Wrong Try Again With Proper Values");
			document.body.style.backgroundColor = "#039be5";
		} else {
			alert(`${preEvent.preName} Event Successfully Updated`);
			//reset everything
			change([]);
			setpreEvent(() => {
				return {
					preName: "",
					preAttributes: "",
				};
			});
			setEvents(() => {
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
		}
	};

	//make data obj->call update->reset all the fields
	const updating = (e) => {
		e.preventDefault();
		try {
			for (const key in events) {
				if (events[key] !== "") {
					if (key === "start" || key === "end") {
						data[key] = {
							dateTime: `${events[key]}:00-05:00`,
							timeZone: "America/New_York",
						};
					} else if (key === "recurrence") {
						if (events[key][0].value !== "S") {
							events[key].forEach((e) => {
								days += e.value + ",";
							});
							days = days.substring(0, days.length - 1);
							recurrence = [
								`RRULE:FREQ=WEEKLY;UNTIL=${events.until.replace(
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
						data[key] = events[key];
					}
				}
			}
			updatingEvent();
		} catch (error) {
			alert(error);
			document.body.style.backgroundColor = "#039be5";
		}
	};

	//control display of fields based of user selection
	const change = (e) => {
		try {
			let event = document.getElementsByClassName("event");
			[...event].forEach((a) => {
				a.style.display = "none";
			});
			setRecuring(true);
			let submit = document.getElementById("submit");
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
						setRecuring(false);
						submit.style.display = "block";
						break;
					default:
				}
			});
		} catch (error) {}
	};

	const editRecurrence = (r) => {
		setEvents((prevState) => {
			return { ...prevState, recurrence: r };
		});
	};

	const afterValue = (v, currentEventID, currentEventColor) => {
		setIDs(currentEventID);
		document.body.style.backgroundColor = currentEventColor || "#039be5";
		setpreEvent((prevState) => {
			return { ...prevState, preName: v };
		});
	};
	return (
		<div className="grid_rcl">
			<center>
				<form className="remove">
					<Remove></Remove>
				</form>
			</center>
			<center className="update">
				<form>
					<h4 id="change">Event Name, Pick One From The List to The Right:</h4>
					<input
						type="text"
						id="change"
						value={preEvent.preName}
						onChange={(e) => {
							const s = e.target.value;
							setpreEvent((prevState) => {
								return { ...prevState, preName: s };
							});
						}}
					/>
					<h4>Event Attributes You Want to Change:</h4>
					<Select
						isMulti
						required
						type="text"
						value={preEvent.preAttributes}
						onChange={(e) => {
							change(e);
							setpreEvent((prevState) => {
								return { ...prevState, preAttributes: e };
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
						value={events.summary}
						placeholder="Required"
						onChange={(e) => {
							const s = e.target.value;
							setEvents((prevState) => {
								return { ...prevState, summary: s };
							});
						}}
					/>
					<h4 className="event description" style={{ display: "none" }}>
						Description:
					</h4>
					<input
						type="text"
						className="event description"
						style={{ display: "none" }}
						value={events.description}
						onChange={(e) => {
							const d = e.target.value;
							setEvents((prevState) => {
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
						value={events.start}
						onChange={(e) => {
							const s = e.target.value;
							setEvents((prevState) => {
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
						value={events.end}
						onChange={(e) => {
							const ed = e.target.value;
							setEvents((prevState) => {
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
						value={events.location}
						onChange={(e) => {
							const l = e.target.value;
							setEvents((prevState) => {
								return { ...prevState, location: l };
							});
						}}
					/>
					<br />
					<h4 className="event recurrence" style={{ display: "none" }}>
						Recurrence:
					</h4>
					<Recurrence
						editRecurrence={editRecurrence}
						value={events.recurrence}
						show={recuring}></Recurrence>

					<div className="event recurrence" style={{ display: "none" }}>
						Until:
					</div>
					<input
						type="date"
						className="event recurrence"
						style={{ display: "none" }}
						value={events.until}
						onChange={(e) => {
							const u = e.target.value;
							setEvents((prevState) => {
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
					{preEvent.preName && (
						<List afterValue={afterValue} preName={preEvent.preName} />
					)}
				</div>
			</center>
		</div>
	);
}
