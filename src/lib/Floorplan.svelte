<script>
  import { onMount } from 'svelte';
  import { lights, updateLight, addLight, removeLight, colorOptions, scheduleOptions, roomOptions, colorMap } from '../stores.js';
  const gridWidth = 40;  // In Columns
  const gridHeight = 30; // In Rows

  let tempName = '';
  let tempRoom = '';
  let tempOn = false;
  let tempColor = '';
  let tempSchedule = '';
  let tempOpacity = 0;

  let spreadDistance = 11;

  // Generate a basic floor plan with walls and doors
  let grid = Array.from({ length: gridHeight }, (_, rowIndex) => {
    return Array.from({ length: gridWidth }, (_, colIndex) => {
      // Define walls and doors
      if (
        // Doorway into apartment
        (rowIndex === 0 && colIndex === 12)
        || (rowIndex === 0 && colIndex === 13)
        || (rowIndex === 0 && colIndex === 14)
        // Doorway into bedroom
        || (rowIndex === 15 && colIndex === 12)
        || (rowIndex === 15 && colIndex === 13)
        || (rowIndex === 15 && colIndex === 14)
        // Doorway into bathroom
        || (rowIndex === 18 && colIndex === 9)
        || (rowIndex === 19 && colIndex === 9)
        || (rowIndex === 20 && colIndex === 9)
        // Doorway into closet
        || (rowIndex === 24 && colIndex === 12)
        || (rowIndex === 24 && colIndex === 13)
        || (rowIndex === 24 && colIndex === 14)
        // Doorway into kitchen
        || (rowIndex === 1 && colIndex === 9)
        || (rowIndex === 2 && colIndex === 9)
        || (rowIndex === 3 && colIndex === 9)
        || (rowIndex === 4 && colIndex === 9)
        || (rowIndex === 5 && colIndex === 9)
        || (rowIndex === 6 && colIndex === 9)
        || (rowIndex === 7 && colIndex === 9)
      ) {
        return 'door'; // Wall on edges
      } else if ( // Define doors
        rowIndex === 0 || rowIndex === gridHeight - 1 || colIndex === 0 || colIndex === gridWidth - 1) {
        return 'wall'; // Specific door positions
      } else if ( // Define room areas
        // Kitchen: Outline
        (rowIndex === 0 && colIndex >= 0 && colIndex <= 26) || 
        (rowIndex === 15 && colIndex >= 0 && colIndex <= 9) || 
        (colIndex === 0 && rowIndex >= 1 && rowIndex <= 15) || 
        (colIndex === 9 && rowIndex >= 1 && rowIndex <= 15) ||
        // Bedroom: Outline
        (rowIndex === 15 && colIndex >= 17 && colIndex <= 39) || 
        // Bathroom: Outline
        (rowIndex === 15 && colIndex >= 9 && colIndex <= 17) ||
        (rowIndex === 24 && colIndex >= 9 && colIndex <= 17) ||
        (colIndex === 9 && rowIndex >= 15 && rowIndex <= 29) ||
        // Closet: Outline
        (rowIndex === 29 && colIndex >= 17 && colIndex <= 43) ||
        (colIndex === 17 && rowIndex >= 25 && rowIndex <= 29) ||
        (colIndex === 43 && rowIndex >= 25 && rowIndex <= 29)
      ) {
        return 'wall'; // Room areas
      } 
      return 'empty'; // Empty space
    });
  });

  let showModal = false;
  let selectedLight = null;
  
  $: if (showModal) {
    const light = $lights.find(light => light.id === selectedLight.id);
    if (light) {
      selectedLight = { ...light };
    }
  }
  
  function openEditModal(light) {
    selectedLight = { ...light };
    showModal = true;
  }
  function closeModal() {
    showModal = false;
  }

  function saveLight() {
    let lightData = {
      name: tempName,
      room: tempRoom,
      on: tempOn,
      color: tempColor,
      schedule: tempSchedule,
      opacity: tempOpacity
    };
    updateLight(selectedLight.id, lightData);
    closeModal();
  }

  function editLight(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    const light = $lights.find(light => light.location_x === row && light.location_y === col);

    tempName = light.name;
    tempRoom = light.room;
    tempOn = light.on;
    tempColor = light.color;
    tempSchedule = light.schedule;
    tempOpacity = light.opacity;
    if (light) {
      openEditModal(light);
    }
  }
  
  function addNewLight(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    const lightData = {
      name: 'New Light',
      room: 'unassigned',
      on: false,
      color: 'yellow',
      schedule: 'none',
      opacity: 1,
      location_x: row,
      location_y: col
    };
    addLight(lightData)
  }

  function deleteLight() {
    console.log(selectedLight);
    removeLight(selectedLight.id);
    closeModal();
  }

  $: {
    $lights.forEach(light => {
      if (!light.on) {
        light.color = "grey";
        light.hex_color = colorMap["grey"];
        light.opacity = 1;
      }
    });
  }

</script>

<div class="grid" style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell {cell}">
        {#if cell === 'empty' || cell === 'door'}
          {#each $lights as light (light.id)}
            {#if light.on && Math.abs(light.location_x - rowIndex) + Math.abs(light.location_y - colIndex) <= spreadDistance}
              {#if !grid.slice(Math.min(light.location_x, rowIndex), Math.max(light.location_x, rowIndex) + 1).some(row => row.slice(Math.min(light.location_y, colIndex), Math.max(light.location_y, colIndex) + 1).includes('wall'))}
                <button class="light-shine" on:click={event => addNewLight(event)} data-row={rowIndex} data-col={colIndex} style="
                  background-color: #{light.hex_color};
                  opacity: {Math.max(0, light.opacity - (Math.abs(light.location_x - rowIndex) + Math.abs(light.location_y - colIndex)) * (1 / spreadDistance))};">
                </button>
              {/if}
            {/if}
          {/each}  
        {/if}
        {#if cell === 'wall'}
          <div class="wall"></div>
        {/if}
        {#if $lights.find(light => light.location_x === rowIndex && light.location_y === colIndex)}
          {#each $lights as light (light.id)}
            {#if light.location_x === rowIndex && light.location_y === colIndex}
              <div class="light_box_around">
                <button class="light" style=
                'background-color: #{light.hex_color};
                opacity: {light.opacity}' on:click={event => editLight(event)} data-row={rowIndex} data-col={colIndex} aria-label="Edit light"></button>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    {/each}
  {/each}
  {#if showModal}
    <div class="modal-backdrop">
      <div class="modal">
        <h2>Edit Light</h2>
        <label>
          Name:
          <input type="text" bind:value={tempName} />
        </label>
        <label>
          Room:
          <select bind:value={tempRoom}>
            {#each $roomOptions as room}
              <option value={room}>{room}</option>
            {/each}
          </select>
        </label>
        <label>
          On:
          <input type="checkbox" bind:checked={tempOn} />
        </label>
        <label>
          Color:
          <select bind:value={tempColor}>
            {#each $colorOptions as color}
              <option value={color}>{color}</option>
            {/each}
          </select>
        </label>
        <label>
          schedule:
          <select bind:value={tempSchedule}>
            {#each $scheduleOptions as schedule}
              <option value={schedule}>{schedule}</option>
            {/each}
          </select>
        </label>
        <label>
          Opacity:
          <input type="range" min="0" max="1" step="0.01" bind:value={tempOpacity}/>
        </label>
        <button on:click={saveLight}>Save</button>
        <button on:click={closeModal}>Cancel</button>
        <button on:click={deleteLight}>Delete</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .modal-backdrop {
    z-index: 1000; /* Ensure it goes to the front */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .modal h2 {
    margin-top: 0;
  }

  .modal label {
    display: block;
    margin: 1rem 0;
  }

  .modal button {
    margin-right: 1rem;
  }

  .grid {
    height: 100%; /* Full viewport height */
    width: 100%; /* Full viewport width */
    display: grid;
    gap: 1px;
    background-color: lightgrey;
  }

  .cell {
    position: relative;
    background-color: white;
  }

  .emptyCell {
    background-color: transparent;
    border: none;
    border: black 0.25px solid;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .light-shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

  .wall {
    background-color: black;
  }

  .light_box_around {
    position: absolute;
    top: 0;
    left: 0;
    height: 90%;
    width: 90%;
    border: black 2px solid;
    background-color: transparent;
  }

  .light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: black 0px solid;
  }

</style>



