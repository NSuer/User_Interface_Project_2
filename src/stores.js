import { writable } from "svelte/store";
import { readable } from 'svelte/store';
import { get } from 'svelte/store';



// Light stuff -------------------------------------------------------------------------------------

// Options for properties in the Light class
export let colorOptions = writable(["red", "blue", "green", "yellow", "purple", "orange", "pink"]);
export let modeOptions = writable(["solid", "blink", "fade"]);
export let roomOptions = writable(["unassigned", "living room", "kitchen", "bedroom", "bathroom", "hallway"]); 

class Light {
    constructor(id, name, location_x, location_y, room, on, opacity, color, mode) {
        this.id = id
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

export let lights = writable([
    new Light(0, "Light 1", 20, 20, "unassigned", false, 0.5, "yellow", "solid"),
    new Light(1, "Light 2", 21, 21, "unassigned", false, 0.5, "blue", "solid"),
    new Light(2, "Light 3", 22, 22, "unassigned", false, 1, "blue", "solid")
]);

export function updateLight(lightIndex, lightData = {}) {
    console.log("Updating light with index: " + lightIndex);
    console.log("Light data:" + JSON.stringify(lightData));
    lights.update(currentLights => {
        return currentLights.map((light, index) => {
            if (index === lightIndex) {
                return new Light(
                    light.id,
                    lightData.name || light.name,
                    lightData.location_x || light.location_x,
                    lightData.location_y || light.location_y,
                    lightData.room || light.room,
                    lightData.on !== undefined ? lightData.on : light.on,
                    lightData.opacity !== undefined ? lightData.opacity : light.opacity,
                    lightData.color || light.color,
                    lightData.mode || light.mode
                );
            }
            return light;
        });
    });
}

export function addLight(lightData = {}) {
    const newLight = new Light(
        get(lights).length + 1,
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
    console.log("Added light: " + JSON.stringify(newLight));
}

export function removeLight(lightIndex) {
    lights.update(currentLights => {
        const updatedLights = currentLights.filter((light, index) => index !== lightIndex);
        return updatedLights.map((light, index) => {
            light.id = index; // Reassign IDs to maintain sequence
            return light;
        });
    });
    console.log("Removed light with index: " + lightIndex);
    console.log("Current lights: " + JSON.stringify(get(lights)));
}


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