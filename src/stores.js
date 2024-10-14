import { writable } from "svelte/store";
import { readable } from 'svelte/store';
import { get } from 'svelte/store';


export let lights = writable([
    {
        name: "Light 1",
        location_x: 20,
        location_y: 20,
        room: "unasigned",
        on: false,
        opacity: 0.5,
        color: "yellow",
        mode: "solid"
    },
    {
        name: "Light 2",
        location_x: 21,
        location_y: 21,
        room: "unasigned",
        on: false,
        opacity: 0.5,
        color: "blue",
        mode: "solid"

    },
    {
        name: "Light 2",
        location_x: 22,
        location_y: 22,
        room: "unasigned",
        on: false,
        opacity: 1,
        color: "blue",
        mode: "solid"

    },
]);

export function DiscoTime() {
    let DiscoColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
    let lightsArray = get(lights);

    let interval1 = setInterval(() => {
        for (let colorIndex = 0; colorIndex < DiscoColors.length; colorIndex++) {
            let interval2 = setInterval(() => {
                for (let opacity = 0; opacity <= 1; opacity += 0.1) {
                    lightsArray = lightsArray.map(element => ({
                        ...element,
                        color: DiscoColors[colorIndex],
                        opacity: opacity
                    }));
                    lights.set(lightsArray);
                }
        }, 10); // Small interval between each iteration
        setTimeout(() => clearInterval(interval2), 30000);
        }
    }, 60); // Small interval between each iteration

    // Stop the disco after 30 seconds
    setTimeout(() => clearInterval(interval1), 30000);
    
}

class Light {
  constructor() {
    this.name = writable("Light 1");
    this.location_x = writable();
    this.location_y = writable();
    this.room = writable("unasigned");
    this.on = writable(false);
    this.opacity = writable(50);
    this.color = writable("white");
    this.mode = writable("solid");
  }
} 