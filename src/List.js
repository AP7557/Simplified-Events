import React, { useState, useEffect } from "react";
import getEvent from "./GetEvent";
import SingleList from "./SingleList";
const colors = [
	"#039be5",
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
export default function List({ preName, afterValue }) {
	const [isOpen, setIsOpen] = useState(false);
	const [event, setEvent] = useState({
		summary: "",
		description: "",
		start: "",
		end: "",
		location: "",
		recurrence: "",
	});

	const removeAllChildNodes = (parent) => {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	};

	//list all the events for given name
	const lists = (result, parentLI, length) => {
		let li = document.createElement("li");
		li.innerHTML = result.summary.toUpperCase();
		li.className = "myList";
		li.style.backgroundColor = colors[result.colorId] || colors[0];
		li.style.color = "white";

		li.addEventListener("click", () => {
			setIsOpen(true);
			let recurrence = "";
			try {
				recurrence = result.recurrence[0];
			} catch (error) {
				recurrence = "Single Day";
			}
			setEvent({
				summary: result.summary,
				description: result.description,
				start: result.start.dateTime,
				end: result.end.dateTime,
				location: result.location,
				recurrence,
			});
			if (length === "M") {
				afterValue(result.summary, result.id, colors[result.colorId]);
			}
		});

		parentLI.appendChild(li);

		if (length === "S") {
			afterValue(result.summary, result.id, colors[result.colorId]);
		}
	};

	useEffect(() => {
		let parentLI = document.getElementById("myList");
		removeAllChildNodes(parentLI);
		getEvent(preName)
			.then((result) => {
				//if you did not get any events
				if (result === undefined || result.length === 0) {
					let li = document.createElement("li");
					li.innerHTML = "No event for that name";
					li.className = "myList";
					parentLI.appendChild(li);
				} else {
					//if found only one event
					if (result.length === 1) {
						lists(result[0], parentLI, "S");
					} else {
						result.forEach((e) => {
							lists(e, parentLI, "M");
						});
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [preName]);

	return (
		<div>
			<h4>Click to Select/See Current Event</h4>
			<h4 id="myList"></h4>
			{isOpen && (
				<SingleList
					open={true}
					onClose={() => {
						setIsOpen(false);
					}}
					singleEvent={event}
				/>
			)}
		</div>
	);
}
