import React, { useState } from "react";
import "./AllEvent.css";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";
import Auth, { token } from "./Auth";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";

export default function Events() {
	//if not sign in then sign it
	if (!token) {
		const history = useHistory();
		alert("Please Sign In");
		history.push("/");
	}
	//render any page
	let [adrender, setadrender] = useState(false);
	let [uprender, setuprender] = useState(false);
	let [signout, setsignout] = useState(false);

	const view = () => {
		window.open("https://calendar.google.com/calendar/");
	};

	//render addevent page
	const addEvent = async () => {
		setadrender(!adrender);
		setuprender(false);
		document.body.style.backgroundColor = "#039be5";
	};

	//render update page
	const updateEvent = () => {
		setadrender(false);
		setuprender(!uprender);
		document.body.style.backgroundColor = "#039be5";
	};

	//signout user
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
				{signout && <Auth signOut={signout} />}
			</div>
		</div>
	);
}
