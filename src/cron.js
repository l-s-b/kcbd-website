// In current container service (Back4App), actual HTTP requests should be made every less than 30 minutes
// Or else the container will hibernate. This cron aims at solving that issue.
import axios from 'axios';

export default function cron() {
    const keepAliveCron = setInterval(
        () => {
            axios.get(`${process.env.REACT_APP_BACKEND_LINK}cron`)
        },
        15*60*1000
    );
}
