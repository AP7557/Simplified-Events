import React from "react";
import "./Nav.css";
import {name} from './Auth'
export default function Navbar({view, addEvent, updateEvent, signOut}) {
	return (
		<nav>
			<img
				src={
					"https://integrations.clickmeeting.com/wp-content/uploads/2018/03/gc-logo.png"
				}
				onClick={view}></img>
			<ul className="nav-links">
				<li onClick={addEvent}>Add Event</li>
				<li onClick={updateEvent}>Update/Remove Event</li>
			</ul>
			<div>
				<span>Hello {name}</span>
				<h4 className="signout" onClick={signOut}>
					Sign Out
				</h4>
			</div>
		</nav>
	);
}
