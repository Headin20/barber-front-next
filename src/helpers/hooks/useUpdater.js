import {useState} from "react";

export const useUpdater = () => {
    const [update, setUpdate] = useState(0);

    const updater = () => setUpdate(state => state + 1);
    return { update, updater };
}