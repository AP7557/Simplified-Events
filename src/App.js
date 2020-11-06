import React from "react";
import Auth from "./Auth";
import Events from "./Events";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Auth}></Route>
					<Route path="/events" exact component={Events}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
