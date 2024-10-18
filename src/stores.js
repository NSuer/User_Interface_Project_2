import { writable } from "svelte/store";
import { readable } from 'svelte/store';
import { get } from 'svelte/store';
import { fade } from "svelte/transition";



// Light stuff -------------------------------------------------------------------------------------

// Options for properties in the Light class

export let isCommandRunning = writable(false);
export let currentCommand = writable("");

export let colorOptions = writable(["red", "blue", "green", "yellow", "purple", "orange", "brown", "grey"]);
export let scheduleOptions = writable(["none", "On during day, off at night", "On at night, off during day"]);
export let roomOptions = writable(["unassigned", "living room", "kitchen", "bedroom", "bathroom", "hallway"]);

export let groupOptions = writable(["all", "living room", "kitchen", "bedroom", "bathroom", "hallway"]);

export const colorMap = {
    "red": "FF0000",
    "blue": "0000FF",
    "green": "00FF00",
    "yellow": "FFFF00",
    "purple": "FF00FF",
    "orange": "FFA500",
    "brown": "A52A2A",
    "grey": "808080"
}


class Light {
    constructor(id, name, location_x, location_y, room, on, opacity, color, schedule) {
        this.id = id;
        this.name = name;
        this.location_x = location_x;
        this.location_y = location_y;
        this.room = room;
        this.on = on;
        this.user_set_opacity = opacity;
        this.opacity = opacity;
        this.user_set_color = color;
        this.color = color;
        this.hex_color = colorMap[color];
        this.schedule = schedule;
    }

    shift(a_color, seconds) {
        const milliseconds = seconds * 1000;
        // We extract the color and only the color, this is to avoid things such as #FF00FF instead of FF00FF
        // https://stackoverflow.com/questions/1636350/how-to-identify-a-given-string-is-hex-color-format
        // https://stackoverflow.com/questions/48343478/what-does-mapnumber-do-here
        const startColor = this.hex_color.match(/\d+/g).map(Number);
        const endColor = a_color.match(/\d+/g).map(Number);
        const steps = milliseconds / 16; // Approx 60 FPS

        let step = 0;
        const stepChange = [
            (endColor[0] - startColor[0]) / steps,
            (endColor[1] - startColor[1]) / steps,
            (endColor[2] - startColor[2]) / steps
        ];

        const interval = setInterval(() => {
            if (step < steps) {
                this.color = `rgb(${Math.round(startColor[0] + stepChange[0] * step)}, 
                                 ${Math.round(startColor[1] + stepChange[1] * step)}, 
                                 ${Math.round(startColor[2] + stepChange[2] * step)})`;
                step++;
            } else {
                this.hex_color = `rgb(${endColor[0]}, ${endColor[1]}, ${endColor[2]})`;
                clearInterval(interval);
            }
        }, 16);
        //

    }

}
Light.defaults = {
    name: "Unnamed Light",
    location_x: 0,
    location_y: 0,
    room: "unassigned",
    on: true,
    opacity: 1,
    color: "yellow",
    schedule: "none"
};

export let lights = writable([
    new Light(0, "Light 1", 4, 4, "kitchen", true, 1, "yellow", "On during day, off at night"),
    new Light(1, "Light 2", 11, 4, "kitchen", true, 1, "blue", "On during day, off at night"),
    new Light(2, "Light 3", 4, 13, "living room", true, 1, "green", "On at night, off during day"),
    new Light(3, "Light 4", 11, 13, "living room", true, 1, "yellow", "On at night, off during day"),
    new Light(4, "Light 5", 4, 24, "living room", true, 1, "purple", "On at night, off during day"),
    new Light(5, "Light 6", 11, 24, "living room", true, 1, "orange", "On at night, off during day"),
    new Light(6, "Light 7", 4, 35, "living room", true, 1, "brown", "On at night, off during day"),
    new Light(7, "Light 8", 11, 35, "living room", true, 1, "red", "On at night, off during day"),
    new Light(8, "Light 9", 19, 4, "closet", true, 1, "blue", "On during day, off at night"),
    new Light(9, "Light 10", 25, 4, "closet", true, 1, "green", "On during day, off at night"),
    new Light(10, "Light 11", 19, 13, "bedroom", true, 1, "red", "On at night, off during day"),
    new Light(11, "Light 12", 26, 13, "bathroom", true, 1, "yellow", "On during day, off at night"),
    new Light(12, "Light 13", 19, 24, "bedroom", true, 1, "purple", "On at night, off during day"),
    new Light(13, "Light 14", 26, 24, "bedroom", true, 1, "orange", "On at night, off during day"),
    new Light(14, "Light 15", 19, 35, "bedroom", true, 1, "brown", "On at night, off during day"),
    new Light(15, "Light 16", 26, 35, "bedroom", true, 1, "yellow", "On at night, off during day")
]);

export function updateLight(lightIndex, lightData = {}) {
    console.log("Updating light with index: " + lightIndex);
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
                    lightData.schedule || light.schedule
                );
            }
            return light;
        });
    });
    console.log("Updated light: " + JSON.stringify(get(lights)[lightIndex]));
}

export function addLight(lightData = {}) {
    const newLight = new Light(
        get(lights).length,
        lightData.name || Light.defaults.name,
        lightData.location_x || Light.defaults.location_x,
        lightData.location_y || Light.defaults.location_y,
        lightData.room || Light.defaults.room,
        lightData.on || Light.defaults.on,
        lightData.opacity || Light.defaults.opacity,
        lightData.color || Light.defaults.color,
        lightData.schedule || Light.defaults.schedule
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

export function run_command(command, group, color) {
    if (get(isCommandRunning)) {
        console.log("Command is already running:", get(isCommandRunning));
        console.log("I don't even know how you got here, I thought I had it locked tight");
        return;
    }
    // Find all lights in the group(room) and run the command on them
    // If group is "all" then run the command on all lights

    currentCommand.set(command);
    isCommandRunning.set(true);
    console.log("Command is running:", get(isCommandRunning));

    console.log("Running command: " + command + " on group: " + group + " with color: " + color);

    // Make an array of all the lights in the group
    let lightsArray = get(lights);
    let groupLights = lightsArray.filter(light => light.room === group || group === "all");

    // Run the command on all the lights in the group
    if (command === "on") {
        groupLights.forEach(light => light.on = true);
        resetLights(groupLights);
        stop_command();
    } else if (command === "off") {
        groupLights.forEach(light => light.on = false);
        updateLightsArray(groupLights)
        stop_command();
    } else if (command === "changeColor") {
        groupLights.forEach(light => light.user_set_color = color);
        resetLights(groupLights);
        stop_command();
    } else if (command === "shift") {
        groupLights.forEach(light => light.user_set_color = color);
        slowShiftColor(groupLights, 5);
    } else if (command === "disco") {
        DiscoTime(groupLights);
    } else if (command === "blink") {
        BlinkTime(groupLights);
    } else if (command === "fade") {
        FadeTime(groupLights);
    } else if (command === "rainbow") {
        RainbowTime(groupLights);
    } else if (command === "day") {
        let dayLights = lightsArray.filter(light => light.schedule === "On during day, off at night");
        let nightLights = lightsArray.filter(light => light.schedule === "On at night, off during day");
        dayLights.forEach(light => light.on = true);
        nightLights.forEach(light => light.on = false);
        resetLights(nightLights.concat(dayLights));
        stop_command();
    } else if (command === "night") {
        let dayLights = lightsArray.filter(light => light.schedule === "On during day, off at night");
        let nightLights = lightsArray.filter(light => light.schedule === "On at night, off during day");
        dayLights.forEach(light => light.on = false);
        nightLights.forEach(light => light.on = true);
        resetLights(nightLights.concat(dayLights));
        stop_command();
    }

}

export function stop_command() {
    currentCommand.set("");
    isCommandRunning.set(false);
}

function updateLightsArray(updatedLights) {
    // Go througb the array of updated lights, and update the lights with the same id in the lights array
    let updatedLightsArray;
    updatedLights.forEach(updatedLight => {
        updatedLightsArray = get(lights).map(light => {
            if (light.id === updatedLight.id) {
                return updatedLight;
            }
            return light;
        });
    });
    lights.set(updatedLightsArray);
}


export function DiscoTime(lightsArray) {
    let DiscoColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];

    let interval1 = setInterval(() => {
        if (!get(isCommandRunning)) {
            clearInterval(interval1);
            resetLights(lightsArray);
            stop_command();
            return;
        }
        for (let colorIndex = 0; colorIndex < DiscoColors.length; colorIndex++) {
            let interval2 = setInterval(() => {
                if (!get(isCommandRunning)) {
                    clearInterval(interval2);
                    resetLights(lightsArray);
                    stop_command();
                    return;
                }
                for (let opacity = 0; opacity <= 1; opacity += 0.1) {
                    lightsArray = lightsArray.map(element => {
                        element.color = DiscoColors[colorIndex];
                        element.hex_color = colorMap[element.color];
                        element.opacity = opacity;
                        return element;
                    });
                    updateLightsArray(lightsArray);
                }
            }, 10); // Small interval between each iteration
        }
    }, 60); // Small interval between each iteration
}

function BlinkTime(lightsArray) {
    let interval = setInterval(() => {
        if (!get(isCommandRunning)) {
            clearInterval(interval);
            resetLights(lightsArray);
            stop_command();
            return;
        }
        lightsArray = lightsArray.map(element => {
            element.on = !element.on;
            if (element.on) {
                element.color = element.user_set_color;
                element.hex_color = colorMap[element.color];
            }
            return element;
        });
        updateLightsArray(lightsArray);
    }, 500); // Small interval between each iteration
}

function FadeTime(lightsArray) {
    let opacity = 0;
    let increment = 0.1;
    let interval = setInterval(() => {
        if (!get(isCommandRunning)) {
            clearInterval(interval);
            resetLights(lightsArray);
            stop_command();
            return;
        }
        lightsArray = lightsArray.map(element => {
            element.opacity = opacity;
            return element;
        });
        updateLightsArray(lightsArray);

        opacity += increment;
        if (opacity >= 1 || opacity <= 0) {
            increment = -increment; // Reverse direction at bounds
        }
    }, 100); // Adjust interval as needed for smooth fading
}

function RainbowTime(lightsArray) {
    let RainbowColors = ["red", "orange", "yellow", "green", "blue", "purple"];
    let lightIndex = 0;
    let colorIndex = 0;

    let interval = setInterval(() => {
        if (!get(isCommandRunning)) {
            clearInterval(interval);
            resetLights(lightsArray);
            stop_command();
            return;
        }
        if (lightIndex < lightsArray.length) {
            lightsArray[lightIndex].color = RainbowColors[colorIndex];
            lightsArray[lightIndex].hex_color = colorMap[RainbowColors[colorIndex]];
            updateLightsArray(lightsArray);
            lightIndex++;
        } else {
            lightIndex = 0;
            colorIndex = (colorIndex + 1) % RainbowColors.length;
        }
    }, 1000); // 1 second interval between each light change
}

function resetLights(lightsArray) {
    lightsArray = lightsArray.map(element => {
        element.color = element.user_set_color;
        element.hex_color = colorMap[element.color];
        element.opacity = element.user_set_opacity;
        return element;
    });
    updateLightsArray(lightsArray);
}

async function slowShiftColor(lightsArray, duration) {
    let startColors = lightsArray.map(light => light.hex_color.match(/.{1,2}/g).map(hex => parseInt(hex, 16)));
    const steps = duration * 60; // Approx 60 FPS

    let step = 0;

    const interval = setInterval(() => {
        if (!get(isCommandRunning)) {
            clearInterval(interval);
            resetLights(lightsArray);
            stop_command();
            return;
        }
        if (step < steps) {
            lightsArray.forEach((light, index) => {
                let endColor = colorMap[light.user_set_color].match(/.{1,2}/g).map(hex => parseInt(hex, 16));
                let stepChanges = [
                    (endColor[0] - startColors[index][0]) / steps,
                    (endColor[1] - startColors[index][1]) / steps,
                    (endColor[2] - startColors[index][2]) / steps
                ];
                const newColorArray = [
                    Math.round(startColors[index][0] + stepChanges[0] * step),
                    Math.round(startColors[index][1] + stepChanges[1] * step),
                    Math.round(startColors[index][2] + stepChanges[2] * step)
                ];
                const hexColor = newColorArray.map(c => c.toString(16).padStart(2, '0')).join('');
                light.hex_color = hexColor;
                light.color = Object.keys(colorMap).find(key => colorMap[key] === light.hex_color) || light.color;
            });
            updateLightsArray(lightsArray);
            step++;
        } else {
            lightsArray.forEach(light => {
                light.hex_color = colorMap[light.user_set_color];
                light.color = light.user_set_color;
            });
            updateLightsArray(lightsArray);
            clearInterval(interval);
            stop_command();
        }
    }, 1000 / 60); // 60 FPS
}
