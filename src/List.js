import React from "react";
import { token } from "./Auth";

export default function List(props) {
	const getEvent = async () => {
		console.log("hello");
        var node = document.createElement("span");                 // Create a <li> node
		var textnode = document.createTextNode("hello"); // Create a text node
		node.appendChild(textnode); // Append the text to <li>
		document.getElementById("myList").appendChild(node);
		// let result = await fetch(
		// 	`https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${preEvent}&key=${process.env.REACT_APP_AUTO_EVENTS_API_KEY}`,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 			Accept: "application/json",
		// 		},
		// 	}
		// );
		// let r = await result.json();
		// console.log(r);
	};

	return <li id="myList" onClick={getEvent}></li>;
}
