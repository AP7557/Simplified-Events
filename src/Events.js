import React, { useState } from "react";
import "./AllEvent.css";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";
import Auth, { token } from "./Auth";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";

export default function Events() {
	// if (!token) {
	// 	const history = useHistory();
	// 	alert("Please Sign In")
	// 	history.push("/");

	// }
	let [adrender, setadrender] = useState(false);
	let [uprender, setuprender] = useState(false);
	let [signout, setsignout] = useState(false);

	const view = () => {
		window.open("https://calendar.google.com/calendar/");
	};

	const addEvent = async () => {
		setadrender(!adrender);
		setuprender(false);
		document.body.style.backgroundColor = "#039be5";
	};

	const updateEvent = () => {
		setadrender(false);
		setuprender(!uprender);
		document.body.style.backgroundColor = "#039be5";
	};

	const signOut = () => {
		setsignout(true);
	};
	return (
		<div>
			<Nav
				view={view}
				addEvent={addEvent}
				updateEvent={updateEvent}
				signOut={signOut}
			/>
			<div>
				{adrender && <AddEvent />}
				{uprender && <UpdateEvent />}
				{signout && <Auth signout={signout} />}
			</div>
		</div>
	);
}
