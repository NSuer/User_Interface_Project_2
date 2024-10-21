<script>
  import Controls from "./lib/Controls.svelte";
  import FloorPlan from "./lib/Floorplan.svelte";
  import Info from "./lib/Info.svelte";
  import { run_command, lights } from "./stores.js";

  let LivingRoomLightsState = true;

  function toggleLights() {
    // Logic to toggle lights on and off
    if (LivingRoomLightsState) {
      run_command("off", "living room");
      LivingRoomLightsState = false;
    } else {
      run_command("on", "living room");
      LivingRoomLightsState = true;
    }
  }

  function listenForCommand() {
    // This will just create a popup saying to use controls on the right
    alert(
      "Professor said we didn't actually need this implemented. Use the fake voice controls on the right to send a command. This UI would be completely replaced by phrases mapping to voice commands.",
    );
  }
</script>

<body>
  <main>
      <div class="UserInterface">
        <h2 style="padding: 0px;">Living room light switch</h2>
        <div class="grid">
          <div class="cell">
            <FloorPlan />
          </div>
          <div class="controls">
            <button class="power-button" on:click={toggleLights}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="100"
                height="100"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="black"
                  stroke-width="4"
                  fill="none"
                />
                <rect x="30" y="10" width="4" height="20" fill="black" />
              </svg>
            </button>
            <button class="command-button"  on:click={listenForCommand}>
                <svg 
                class="test"
                fill="#000000"
                height="70px"
                width= "70%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 512 512"
                ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g><g id="SVGRepo_iconCarrier">
                  <g>
                  <g>
                    <path
                    d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"
                    ></path>
                    <path
                    d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"
                    ></path>
                  </g>
                  </g>
                </g></svg
                >
                <span style="position: relative; width:100%; bottom: 3px;">Voice Command</span>
            </button>
          </div>
        </div>
        <Info />
      </div>
    <Controls />
  </main>
</body>

<style>
  :root {
    --yellow: rgb(251, 203, 51);
  }

  body {
    position: absolute;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

    background-image: linear-gradient(
      to bottom right,
      white,
      rgb(255, 254, 181)
    );
    background-repeat: repeat;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    color: black;

    padding: 0;
    margin: 0;

    overflow: auto;
  }

  .cell {
    position: relative;
    width: 100%;
    height: 100%;
  }

  main {
    position: relative;

    width: 95%;
    height: 80%;
    top: 10%;
    left: 2.5%;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2%;
  }

  .UserInterface {
    position: relative;

    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid rgb(0, 0, 0, 0.6);
    box-shadow: 5px 5px 5px rgb(54, 54, 54, 0.5);
    background-color: white;
    border-radius: 20px;
  }

  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
    gap: 20px;
    margin-left: 0;
  }

  .power-button {
    background-color: var(--yellow);
    border: none;
    border-radius: 50%;
    width: 60%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .command-button {
    background-color: var(--yellow);
    border: none;
    border-radius: 50%;
    width: 60%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .grid {
    width: 100%;
    height: 100%;

    border: 2px solid rgb(0, 0, 0, 0.6);

    display: grid;
    grid-template-columns: 80% 20%;
  }

  .test {
    position: relative;
    left: 16px;
    top: 10px;
  }
</style>
