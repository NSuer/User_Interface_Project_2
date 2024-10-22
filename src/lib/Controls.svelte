<script lang="ts">
    import {
        groupOptions,
        run_command,
        colorOptions,
        isCommandRunning,
        currentCommand,
        stop_command,
        scheduleOptions,
    } from "../stores.js";

    import InfoControls from "./InfoControls.svelte";

    // I only used TS here because of an annoying bug with Svelte's type inference
    function getSelectValue(id: string): string {
        return (document.getElementById(id) as HTMLSelectElement).value;
    }
    
</script>
    <div class="control_box">
        <header>
            <div class="titleAndImg">
                <h1 class="title">The Smart Lightbulb</h1>
                <img
                src="public/powered-bulb.png"
                width="50px"
                height="50px"
                alt=""
                />
            </div>
        </header>
        <div style="display: flex; flex-direction: row; align-items: center;gap: 30px;">
            <section>
                <div class="spacer" style="bottom: 40px;"></div>
                <h2 class="voice_controls">Voice Controls</h2>
                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'on' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'off' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'changeColor' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'shift' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'disco' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'blink' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'fade' ? 'green' : 'red'};">●</span>
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
                </div>

                <div class="voice_controls">
                    <span style="color: {$currentCommand === 'rainbow' ? 'green' : 'red'};">●</span>
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
                </div>

                <!--  -->
                <h2 class="schedule_controls">Schedule Controls</h2>
                <div class="schedule_controls">
                    <span style="color: {$currentCommand === 'day' ? 'green' : 'red'};">●</span>
                    <label for="dayLights"> Simulate Daytime:</label>
                    <button
                        id="dayLights"
                        on:click={() =>
                            run_command(
                                "day"
                            )}
                        disabled={$isCommandRunning}>Run</button>     
                </div>
                <div class="schedule_controls">
                    <span style="color: {$currentCommand === 'night' ? 'green' : 'red'};">●</span>
                    <label for="nightLights"> Simulate Nighttime:</label>
                    <button
                        id="nightLights"
                        on:click={() =>
                            run_command(
                                "night"
                            )}
                        disabled={$isCommandRunning}>Run</button>
                </div>
            </section>
            <div style="display: flex; flex-direction: column; align-items: center; width: 34%;">
                <h4 style="position: relative; top: 12px;">Real-World Implementation</h4>
                <img src="src/pictures/Real_interface.png" alt="Real Interface" width="90%" height="100%">
            </div>
        </div>
        
        <!--<h2 class="voice_controls">Graphic of where this UI would reside on the physical smart object</h2>-->
        
        <InfoControls />

        <footer>William Braun, Owen Richards, Nathan Suer, Sam Weese</footer>
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
        min-height: 85%;

        background-color: white;
        box-shadow: 5px 5px 5px rgb(54, 54, 54, 0.5);
    }
    .voice_controls {
        position: relative;
        left: 2.5%;
        margin-top: 10px;
        bottom: 30px;
    }
    .schedule_controls {
        position: relative;
        left: 2.5%;
        margin-top: 10px;
        bottom: 30px;
    }
    footer {
    position: relative;

    width: 95%;
    margin-top: 20px;
    left: 2.5%;

    text-align: center;
    color: rgb(102, 102, 102);
  }

  .titleAndImg {
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    bottom: 20px;
  }

  .title {
    position: relative;
    font-size: 2em;
    padding: 0;
  }

  .spacer {
    position: relative;
    height: 0.1%;
    left: 2.5%;
    width: 95%;

    background-color: rgba(19, 19, 19, 0.3);
  }
</style>