import React from "react";

export default function Navbar(props) {
	return (
		<nav>
			<img src={"https://integrations.clickmeeting.com/wp-content/uploads/2018/03/gc-logo.png"} onClick={props.view}></img>
			<ul className="nav-links">
				<li onClick={props.addEvent}>Add Event</li>
				<li onClick={props.updateEvent}>Update/Remove Event</li>
			</ul>
			<h4 className="signout" onClick={props.signOut}>Sign Out</h4>
		</nav>
	);
}
