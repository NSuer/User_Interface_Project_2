import { writable } from "svelte/store";
import { readable } from 'svelte/store';
import { get } from 'svelte/store';



// Light stuff -------------------------------------------------------------------------------------

// Options for properties in the Light class
export let colorOptions = writable(["red", "blue", "green", "yellow", "purple", "orange", "pink", "grey"]);
export let modeOptions = writable(["solid", "blink", "fade"]);
export let roomOptions = writable(["unassigned", "living room", "kitchen", "bedroom", "bathroom", "hallway"]); 

export let groupOptions = writable(["all", "living room", "kitchen", "bedroom", "bathroom", "hallway"]);

export const colorMap = {"red" : "FF0000", 
                "blue" : "0000FF",
                "green" : "00FF00",
                "yellow" : "FFFF00",
                "purple" : "FF00FF",
                "orange" : "FFA500",
                "pink" : "FFC0CB",
                "grey" : "808080"
            }


class Light {
    constructor(id, name, location_x, location_y, room, on, opacity, color, mode) {
        this.id = id;
        this.name = name;
        this.location_x = location_x;
        this.location_y = location_y;
        this.room = room;
        this.on = on;
        this.opacity = opacity;
        this.color = color;
        this.hex_color = colorMap[color];
        this.mode = mode;
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
    mode: "solid"
};

export let lights = writable([
    new Light(0, "Light 1", 20, 20, "unassigned", true, 0.5, "yellow", "solid"),
    new Light(1, "Light 2", 21, 21, "unassigned", false, 0.5, "blue", "solid"),
    new Light(2, "Light 3", 22, 22, "unassigned", true, 1, "blue", "solid")
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
        get(lights).length,
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

export function run_command(command, group, color) {
    // Find all lights in the group(room) and run the command on them
    // If group is "all" then run the command on all lights

    console.log("Running command: " + command + " on group: " + group + " with color: " + color);
    
    // Make an array of all the lights in the group
    let lightsArray = get(lights);
    let groupLights = lightsArray.filter(light => light.room === group || group === "all");

    // Run the command on all the lights in the group
    if (command === "on") {
        groupLights.forEach(light => light.on = true);
        // turn all colors to yellow
        groupLights.forEach(light => light.color = color);
        groupLights.forEach(element => element.hex_color = colorMap[element.color]);
        updateLightsArray(groupLights)
    } else if (command === "off") {
        groupLights.forEach(light => light.on = false);
        updateLightsArray(groupLights)
    } else if (command === "disco") {
        DiscoTime(lightsArray);
    } else if (command === "blink") {
        BlinkTime(lightsArray, color);
    } else if (command === "fade") {
        FadeTime(lightsArray);
    } else if (command === "rainbow") {
        RainbowTime(lightsArray);
    } else if (command === "shift") {
        slowShiftColor(lightsArray, color, 5);
        // groupLights.forEach(light => light.shift(color, 5));
    } else if (command === "changeColor") {
        groupLights.forEach(light => light.color = color);
        groupLights.forEach(element => element.hex_color = colorMap[element.color]);
        updateLightsArray(groupLights)
    }
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
        for (let colorIndex = 0; colorIndex < DiscoColors.length; colorIndex++) {
            let interval2 = setInterval(() => {
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
            setTimeout(() => clearInterval(interval2), 30000);
        }
    }, 60); // Small interval between each iteration

    // Stop the disco after 30 seconds
    setTimeout(() => clearInterval(interval1), 30000);
}

function BlinkTime(lightsArray, color) {
    let interval = setInterval(() => {
        lightsArray = lightsArray.map(element => {
            if (element.on) {
                element.on = false;
            } else {
                element.on = true;
                element.color = color;
                element.hex_color = colorMap[element.color];

            }
            return element;
        });
        updateLightsArray(lightsArray);
    }, 500); // Small interval between each iteration

    // Stop the disco after 30 seconds
    setTimeout(() => clearInterval(interval), 30000);
}

function FadeTime(lightsArray) {
    let opacity = 0;
    let increment = 0.1;
    let interval = setInterval(() => {
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

    // Stop the disco after 30 seconds
    setTimeout(() => clearInterval(interval), 30000);
}

function RainbowTime(lightsArray) {
    let RainbowColors = ["red", "orange", "yellow", "green", "blue", "purple"];
    let lightIndex = 0;
    let colorIndex = 0;

    let interval = setInterval(() => {
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

    // Stop the rainbow effect after 30 seconds
    setTimeout(() => clearInterval(interval), 30000);
}

export function slowShiftColor(lightsArray, newColor, duration) {
    lightsArray.forEach(light => {
        const startColor = light.hex_color.match(/.{1,2}/g).map(hex => parseInt(hex, 16));
        const endColor = colorMap[newColor].match(/.{1,2}/g).map(hex => parseInt(hex, 16));
        const steps = duration * 60; // Approx 60 FPS

        let step = 0;
        const stepChange = [
            (endColor[0] - startColor[0]) / steps,
            (endColor[1] - startColor[1]) / steps,
            (endColor[2] - startColor[2]) / steps
        ];

        const interval = setInterval(() => {
            if (step < steps) {
                const newColorArray = [
                    Math.round(startColor[0] + stepChange[0] * step),
                    Math.round(startColor[1] + stepChange[1] * step),
                    Math.round(startColor[2] + stepChange[2] * step)
                ];
                const hexColor = newColorArray.map(c => c.toString(16).padStart(2, '0')).join('');
                light.hex_color = hexColor;
                light.color = Object.keys(colorMap).find(key => colorMap[key] === light.hex_color) || light.color;
                lights.update(currentLights => {
                    return currentLights.map(l => (l.id === light.id ? light : l));
                });
                step++;
            } else {
                light.hex_color = colorMap[newColor];
                light.color = newColor;
                clearInterval(interval);
            }
        }, 1000 / 60); // 60 FPS
    });
}
