import React from "react";
import { auth } from "./firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import "./Signin.css";

let token, name;
export default function Auth1({signOut}) {
	const history = useHistory();
	//signin using google and get users permission to access calendar
	const signin = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/calendar.events");

		auth.signInWithPopup(provider)
			.then(function (result) {
				token = result.credential.accessToken;
				let user = result.user;
				name = user.displayName,
				history.push("/events");
			})
			.catch(function (error) {
				console.log(error.code);
				console.log(error.message);
			});
	};
	//signout user
	const signout = () => {
		firebase
			.auth()
			.signOut()
			.then(function () {
				history.push("/");
			})
			.catch(function (error) {
				alert(error);
			});
	};
	if (signOut === true) {
		signout();
	}
	return (
		<>
			<center>
				<div className="typewriter">
					<h1>Welcome to Simplified Events</h1>
					<h4 id="line-1">Where you can </h4>
					<h3 id="line-2">add</h3>
					<h3 id="line-3">edit</h3>
					<h3 id="line-4">remove</h3>
					<h4 id="line-5">any events from your google calendar</h4>
				</div>
				<div className="center-button">
					<button className="btn-save" type="submit" onClick={signin}>
						<strong>Sign In</strong>
					</button>
				</div>
			</center>
		</>
	);
}

export { token, name };
