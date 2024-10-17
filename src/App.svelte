<script>
// @ts-nocheck

  import FloorPlan from './lib/Floorplan.svelte';
    import Info from './lib/Info.svelte';
  import { groupOptions, run_command, colorOptions } from './stores.js';
  import { lights } from './stores.js';
  let navValue = "Controls";
  let button1, button2, button3;

  // function animate(val) {
  //   if (val == 1){
  //     button1.animate(
  //       [{ background: 'lightgray' }],
  //       { duration: 200, direction: 'alternate', iterations: 2 },
  //     )
  //     navValue = 'Controls';
  //   }
  //   else if (val == 2) {
  //     button2.animate(
  //       [{ background: 'lightgray' }],
  //       { duration: 200, direction: 'alternate', iterations: 2 },
  //     )
  //     navValue = 'Indicators';
  //   }
  //   else {
  //     button3.animate(
  //       [{ background: 'lightgray' }],
  //       { duration: 200, direction: 'alternate', iterations: 2 },
  //     )
  //     navValue = 'Settings';
  //   }
		
	// }

</script>

<body>
  <header>
    <div class="titleAndImg">
      <h1 class="title">The Smart Lightbulb</h1>
      <img src="src/assets/powered-bulb.png"  width="105px" height="105px" alt=""> 
    </div>
    <!-- {#if titleHoverCheck}
      <div on:mouseenter={titleHovered} on:mouseleave={titleHovered} style="position: relative; display: flex; flex-direction: row; width: fit-content; height:fit-content; left: 2.5%;">
        <h1 class="title" style="color: var(--yellow)" >The Smart Lightbulb</h1>
        <img src="src/assets/powered-bulb.png"  width="105px" height="105px" alt=""> 
      </div>
    {:else}
      <div on:mouseenter={titleHovered} on:mouseleave={titleHovered} style="position: relative; display: flex; flex-direction: row; width: fit-content; left: 2.5%;">
        <h1 class="title" style="color: black">The Smart Lightbulb</h1>
        <img src="src/assets/non-powered-bulb.png" width="105px" height="105px" alt="">
      </div>
    {/if} -->
  </header>
  <div class="spacer" style="bottom: 50px;"></div>
  <main>
    <div style="position:relative; display:flex; flex-direction: column; width:45%;">
      <div class="grid">
        <FloorPlan />
        <Info />
      </div>
    </div>
    <div class="information">
        <h2 style="position:relative; left: 2.5%;">Controls</h2>
        <!-- Add button for each control and a dropdown, with label -->
        <div style="position:relative; left: 2.5%;">
          <label for="turnOnLights"> Turn on Lights:</label>
          <button id="turnOnLights" on:click={() => run_command('on', document.getElementById('groupSelect_on').value, document.getElementById('colorSelect_on').value)}>Run</button>
          <label for="groupSelect_on">Group:</label>
          <select id="groupSelect_on">
            {#each $groupOptions as group}
              <option value={group}>{group}</option>
            {/each}
          </select>
          <label for="colorSelect_on">Color:</label>
          <select id="colorSelect_on">
            {#each $colorOptions as color}
              <option value={color}>{color}</option>
            {/each}
          </select>
        </div>

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="turnOffLights"> Turn off Lights:</label>
          <button id="turnOffLights" on:click={() => run_command('off', document.getElementById('groupSelect_off').value)}>Run</button>
          <label for="groupSelect_off">Group:</label>
          <select id="groupSelect_off">
            {#each $groupOptions as group}
              <option value={group}>{group}</option>
            {/each}
          </select>
        </div>

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="discoLights"> Disco Mode:</label>
          <button id="discoLights" on:click={() => run_command('disco',  document.getElementById('groupSelect_disco').value)}>Run</button>
          <label for="groupSelect_disco">Group:</label>
          <select id="groupSelect_disco">
            {#each $groupOptions as group}
              <option value={group}>{group}</option>
            {/each}
          </select>
        </div>

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="blinkLights"> Blink Lights:</label>
          <button id="blinkLights" on:click={() => run_command('blink',  document.getElementById('groupSelect_blink').value, document.getElementById('colorSelect_blink').value)}>Run</button>
          <label for="groupSelect_blink">Group:</label>
          <select id="groupSelect_blink">
            {#each $groupOptions as group}
              <option value={group}>{group}</option>
            {/each}
          </select>
          <label for="colorSelect_blink">Color:</label>
          <select id="colorSelect_blink">
            {#each $colorOptions as color}
              <option value={color}>{color}</option>
            {/each}
          </select>
        </div>

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="fadeLights"> Fade Lights:</label>
          <button id="fadeLights" on:click={() => run_command('fade',  document.getElementById('groupSelect_fade').value)}>Run</button>
          <label for="groupSelect_fade">Group:</label>
          <select id="groupSelect_fade">
            {#each $groupOptions as group}
              <option value={group}>{group}</option>
            {/each}
          </select>
        </div>

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="rainbowLights"> Rainbow Mode:</label>
          <button id="rainbowLights" on:click={() => run_command('rainbow',  document.getElementById('groupSelect_rainbow').value)}>Run</button>
          <label for="groupSelect_rainbow">Group:</label>
          <select id="groupSelect_rainbow">
            {#each $groupOptions as group}
              <option value={group}>{group}</option>
            {/each}
          </select>
        </div>

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="shiftLights"> Shift Lights:</label>
          <button id="shiftLights" on:click={() => run_command('shift', document.getElementById('groupSelect_shift').value, document.getElementById('colorSelect_shift').value)}>Run</button>
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

        <div style="position:relative; left: 2.5%; margin-top: 10px;">
          <label for="changeColorLights"> Change Color:</label>
          <button id="changeColorLights" bind:this={button2} on:click={() => run_command('changeColor', document.getElementById('groupSelect_changeColor').value, document.getElementById('colorSelect_changeColor').value)}>Run</button>
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

        
    </div>
  </main>
  <footer>William Braun, Owen Richards, Nathan Suer, Sam Weese</footer>
</body>

<style>
  :root {
    --yellow: rgb(251,203,51);
  }

  body {
    position: absolute;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

    background-image: linear-gradient(to bottom right, white, rgb(255, 254, 181));
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

  nav {
    position: relative;
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between; 

    width: 100%;
    height: 10%;
  }
  
  .title {
    position: relative;
    font-size: 4em;
    padding: 0;
  }

  .titleAndImg {
    position: relative; 

    display: flex; 
    flex-direction: row; 
    justify-content: center;
    align-items: center;

    bottom: 20px;
  }

  ul {
    position: relative;
    list-style: none;

    right: 2.5%;

    display: flex;
    flex-direction: row;
    gap: 30px;

    justify-content: center;
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

  .spacer {
    position: relative;
    height: 0.1%;
    bottom: 10px;
    left: 2.5%;
    width: 95%;

    background-color: rgba(19, 19, 19, 0.3);
  }

  .img-descrip {
    position: relative;
    top: 0;
    color: white;

    width: 95%;
    left: 2.5%;
    border-radius: 20px;
    
    height: 20%;
    
    background-image: url('/src/assets/header-img-background.jpg');
    background-color: var(--yellow);
    background-position: 120% 55%;
    background-repeat: no-repeat;
    border: rgba(216, 216, 216, 0.6) 2px solid;

    display: flex;
    align-items: center;
  }

  main {
    position: relative;

    width: 95%;
    height: 80%;
    left: 5%;

    display: flex;
    flex-direction: row;
    gap: 5%;
  }

  .grid {
    position: relative;

    width: 100%;
    height: 85%;

    border: 2px solid rgb(0, 0, 0, 0.6);
    box-shadow: 5px 5px 5px rgb(54, 54, 54, 0.5);
  }

  .information {
    position: relative;

    border: 2px solid rgb(0, 0, 0, 0.6);
    border-radius: 20px;

    width: 45%;
    height: 85%;

    background-color: white;
    box-shadow: 5px 5px 5px rgb(54, 54, 54, 0.5);
  }
  
  .navText {
    position: relative;

    /*border: 1px solid black;*/
    width: 100%;
    height: 90%;
    left: 2.5%;
  }

  footer {
    position: relative;

    width: 95%;
    left: 2.5%;

    text-align: center;
    color: rgb(102, 102, 102);
  }
</style>
