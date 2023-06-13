
import moment from "moment";
import { useEffect, useState } from 'react';


function CountDownDate({ date }) {
    const [loder, setLoder] = useState(true);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (loder) {
            const loadeCounter = setInterval(() => {
                setLoder(false);
            }, 2000)
        }

        var countDownDate = new Date(moment(date * 1000)).getTime();
        const interval = setInterval(() => {
            var now = new Date().getTime();

            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(0);
                setCount('LIVE');
            } else {
                if (days == 0) {
                    setCount(hours + "h " + minutes + "m " + seconds + "s ");
                } else {
                    setCount(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
                }
            }
        }, 1000);


        //Clearing the interval
        return () => clearInterval(interval);
    });

    return (
        <div>{count}</div>
    )
}

export default CountDownDate