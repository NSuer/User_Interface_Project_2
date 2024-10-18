<script lang="ts">
    import {
        groupOptions,
        run_command,
        colorOptions,
        lights,
        isCommandRunning,
        currentCommand,
        stop_command,
    } from "../stores.js";

    // I only used TS here because of an annoying bug with Svelte's type inference
    function getSelectValue(id: string): string {
        return (document.getElementById(id) as HTMLSelectElement).value;
    }

    
    
</script>

<div class="control_box">
    <h2 style="position:relative; left: 2.5%;">Controls</h2>
    <!-- Add button for each control and a dropdown, with label -->
    <div style="position:relative; left: 2.5%;">
        <label for="turnOnLights"> Turn on Lights:</label>
        <button
            id="turnOnLights"
            on:click={() =>
                run_command(
                    "on",
                    getSelectValue("groupSelect_on"),
                )}
            disabled={$isCommandRunning}>Run</button>
        <label for="groupSelect_on">Group:</label>
        <select id="groupSelect_on">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'on' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="turnOffLights"> Turn off Lights:</label>
        <button
            id="turnOffLights"
            on:click={() =>
                run_command(
                    "off",
                    getSelectValue("groupSelect_off"),
                )}
            disabled={$isCommandRunning}>Run</button>
        <label for="groupSelect_off">Group:</label>
        <select id="groupSelect_off">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'off' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="changeColorLights"> Change Color:</label>
        <button
            id="changeColorLights"
            on:click={() =>
                run_command(
                    "changeColor",
                    getSelectValue("groupSelect_changeColor"),
                    getSelectValue("colorSelect_changeColor")
                )}
            disabled={$isCommandRunning}>Run</button>
        <label for="groupSelect_changeColor">Group:</label>
        <select id="groupSelect_changeColor">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <label for="colorSelect_changeColor">Color:</label>
        <select id="colorSelect_changeColor">
            {#each $colorOptions as color}
                <option value={color}>{color}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'changeColor' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="shiftLights"> Shift Lights:</label>
        <button
            id="shiftLights"
            on:click={() =>
                run_command(
                    "shift",
                    getSelectValue("groupSelect_shift"),
                    getSelectValue("colorSelect_shift"),
                )}
            disabled={$isCommandRunning}>Run</button>
        <label for="groupSelect_shift">Group:</label>
        <select id="groupSelect_shift">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <label for="colorSelect_shift">Color:</label>
        <select id="colorSelect_shift">
            {#each $colorOptions as color}
                <option value={color}>{color}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'shift' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="discoLights"> Disco Mode:</label>
        <button
            id="discoLights"
            on:click={() =>
                run_command(
                    "disco",
                    getSelectValue("groupSelect_disco")
                )}
            disabled={$isCommandRunning}>Run</button>
        <button
            on:click={() => stop_command()}
            disabled={!$isCommandRunning || $currentCommand !== 'disco'}>Stop</button>
        <label for="groupSelect_disco">Group:</label>
        <select id="groupSelect_disco">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'disco' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="blinkLights"> Blink Lights:</label>
        <button
            id="blinkLights"
            on:click={() =>
                run_command(
                    "blink",
                    getSelectValue("groupSelect_blink"),
                )}
            disabled={$isCommandRunning}>Run</button>
        <button
            on:click={() => stop_command()}
            disabled={!$isCommandRunning || $currentCommand !== 'blink'}>Stop</button>
        <label for="groupSelect_blink">Group:</label>
        <select id="groupSelect_blink">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'blink' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="fadeLights"> Fade Lights:</label>
        <button
            id="fadeLights"
            on:click={() =>
                run_command(
                    "fade",
                    getSelectValue("groupSelect_fade"),
                )}
            disabled={$isCommandRunning}>Run</button>
        <button
            on:click={() => stop_command()}
            disabled={!$isCommandRunning || $currentCommand !== 'fade'}>Stop</button>
        <label for="groupSelect_fade">Group:</label>
        <select id="groupSelect_fade">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'fade' ? 'green' : 'red'};">●</span>
    </div>

    <div style="position:relative; left: 2.5%; margin-top: 10px;">
        <label for="rainbowLights"> Rainbow Mode:</label>
        <button
            id="rainbowLights"
            on:click={() =>
                run_command(
                    "rainbow",
                    getSelectValue("groupSelect_rainbow"),
                )}
            disabled={$isCommandRunning}>Run</button>
        <button
            on:click={() => stop_command()}
            disabled={!$isCommandRunning || $currentCommand !== 'rainbow'}>Stop</button>
        <label for="groupSelect_rainbow">Group:</label>
        <select id="groupSelect_rainbow">
            {#each $groupOptions as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <span style="color: {$currentCommand === 'rainbow' ? 'green' : 'red'};">●</span>
    </div>
</div>

<style>
    :root {
        --yellow: rgb(251, 203, 51);
    }

    button {
        position: relative;
        padding: 5px 10px;
        border: 1px solid rgba(85, 85, 85, 0.25);
        background-color: white;

        border-radius: 10px;
    }

    button:hover {
        cursor: pointer;
        box-shadow: 0px 0.5px 0px 0.5px rgb(170, 170, 170);
    }

    .control_box {
        position: relative;

        border: 2px solid rgb(0, 0, 0, 0.6);
        border-radius: 20px;

        width: 45%;
        height: 85%;

        background-color: white;
        box-shadow: 5px 5px 5px rgb(54, 54, 54, 0.5);
    }
</style>