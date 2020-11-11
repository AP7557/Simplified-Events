import {token} from "./Auth"
const getEvent = async (name) => {
    let result = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${name}&key=${process.env.REACT_APP_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
    let r = await result.json();
    return r.items;
}

export default getEvent
