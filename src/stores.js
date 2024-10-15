import { writable } from "svelte/store";
import { readable } from 'svelte/store';
import { get } from 'svelte/store';

class Light {
    constructor(name, location_x, location_y, room, on, opacity, color, mode) {
        this.name = name;
        this.location_x = location_x;
        this.location_y = location_y;
        this.room = room;
        this.on = on;
        this.opacity = opacity;
        this.color = color;
        this.mode = mode;
    }
}
Light.defaults = {
    name: "Unnamed Light",
    location_x: 0,
    location_y: 0,
    room: "unassigned",
    on: false,
    opacity: 1,
    color: "white",
    mode: "solid"
};

export function addLight(lightData = {}) {
    const newLight = new Light(
        lightData.name || Light.defaults.name,
        lightData.location_x || Light.defaults.location_x,
        lightData.location_y || Light.defaults.location_y,
        lightData.room || Light.defaults.room,
        lightData.on || Light.defaults.on,
        lightData.opacity || Light.defaults.opacity,
        lightData.color || Light.defaults.color,
        lightData.mode || Light.defaults.mode
    );
    lights.update(currentLights => [...currentLights, newLight]);
}
export let lights = writable([
    new Light("Light 1", 20, 20, "unasigned", false, 0.5, "yellow", "solid"),
    new Light("Light 2", 21, 21, "unasigned", false, 0.5, "blue", "solid"),
    new Light("Light 3", 22, 22, "unasigned", false, 1, "blue", "solid")
]);

export function DiscoTime() {
    let DiscoColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
    let lightsArray = get(lights);

    let interval1 = setInterval(() => {
        for (let colorIndex = 0; colorIndex < DiscoColors.length; colorIndex++) {
            let interval2 = setInterval(() => {
                for (let opacity = 0; opacity <= 1; opacity += 0.1) {
                    lightsArray = lightsArray.map(element => {
                        element.color = DiscoColors[colorIndex];
                        element.opacity = opacity;
                        return element;
                    });
                    lights.set(lightsArray);
                }
            }, 10); // Small interval between each iteration
            setTimeout(() => clearInterval(interval2), 30000);
        }
    }, 60); // Small interval between each iteration

    // Stop the disco after 30 seconds
    setTimeout(() => clearInterval(interval1), 30000);
}