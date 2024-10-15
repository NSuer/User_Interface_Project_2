<script>
  import { onMount } from 'svelte';
  import { lights, updateLight, colorOptions, modeOptions, roomOptions } from '../stores.js';
  const gridWidth = 40;  // In Columns
  const gridHeight = 30; // In Rows

  let tempName = '';
  let tempRoom = '';
  let tempOn = false;
  let tempColor = '';
  let tempMode = '';
  let tempOpacity = 0;

  // Generate a basic floor plan with walls and doors
  const grid = Array.from({ length: gridHeight }, (_, rowIndex) => {
    return Array.from({ length: gridWidth }, (_, colIndex) => {
      // Define walls and doors
      if (
        // Doorway into apartment
        (rowIndex === Math.floor(gridHeight * 0.0) && colIndex === Math.floor(gridWidth * 0.33))
        // Doorway into bedroom
        || (rowIndex === Math.floor(gridHeight * 0.5) && colIndex === Math.floor(gridWidth * 0.33))
        // Doorway into bathroom
        || (rowIndex === Math.floor(gridHeight * 0.65) && colIndex === Math.floor(gridWidth * 0.23))
        // Doorway into closet
        || (rowIndex === Math.floor(gridHeight * 0.8) && colIndex === Math.floor(gridWidth * 0.33))
        // Doorway into kitchen
        || (rowIndex === Math.floor(gridHeight * 0.1) && colIndex === Math.floor(gridWidth * 0.23))
      ) {
        return 'door'; // Wall on edges
      } else if ( // Define doors
        rowIndex === 0 || rowIndex === gridHeight - 1 || colIndex === 0 || colIndex === gridWidth - 1) {
        return 'wall'; // Specific door positions
      } else if ( // Define room areas
        // Kitchen: Outline
        (rowIndex === Math.floor(gridHeight * 0.0) && colIndex >= Math.floor(gridWidth * 0.0) && colIndex <= Math.floor(gridWidth * 0.67)) || 
        (rowIndex === Math.floor(gridHeight * 0.5) && colIndex >= Math.floor(gridWidth * 0.0) && colIndex <= Math.floor(gridWidth * 0.23)) || 
        (colIndex === Math.floor(gridWidth * 0.0) && rowIndex >= Math.floor(gridHeight * 0.03) && rowIndex <= Math.floor(gridHeight * 0.5)) || 
        (colIndex === Math.floor(gridWidth * 0.23) && rowIndex >= Math.floor(gridHeight * 0.03) && rowIndex <= Math.floor(gridHeight * 0.5)) ||
        // Bedroom: Outline
        (rowIndex === Math.floor(gridHeight * 0.5) && colIndex >= Math.floor(gridWidth * 0.43) && colIndex <= Math.floor(gridWidth * 1.0)) || 
        // Bathroom: Outline
        (rowIndex === Math.floor(gridHeight * 0.5) && colIndex >= Math.floor(gridWidth * 0.23) && colIndex <= Math.floor(gridWidth * 0.43)) ||
        (rowIndex === Math.floor(gridHeight * 0.8) && colIndex >= Math.floor(gridWidth * 0.23) && colIndex <= Math.floor(gridWidth * 0.43)) ||
        (colIndex === Math.floor(gridWidth * 0.23) && rowIndex >= Math.floor(gridHeight * 0.5) && rowIndex <= Math.floor(gridHeight * 1.0)) ||
        // Closet: Outline
        (rowIndex === Math.floor(gridHeight * 1.0) && colIndex >= Math.floor(gridWidth * 0.43) && colIndex <= Math.floor(gridWidth * 1.1)) ||
        (colIndex === Math.floor(gridWidth * 0.43) && rowIndex >= Math.floor(gridHeight * 0.83) && rowIndex <= Math.floor(gridHeight * 1.0)) ||
        (colIndex === Math.floor(gridWidth * 1.1) && rowIndex >= Math.floor(gridHeight * 0.83) && rowIndex <= Math.floor(gridHeight * 1.0))
      ) {
        return 'wall'; // Room areas
      } 
      return null; // Empty space
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
      mode: tempMode,
      opacity: tempOpacity
    };
    updateLight(selectedLight.id, lightData);
    closeModal();
  }

  function editLight(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    const light = $lights.find(light => light.location_x === row && light.location_y === col);
    console.log(light);

    tempName = light.name;
    tempRoom = light.room;
    tempOn = light.on;
    tempColor = light.color;
    tempMode = light.mode;
    tempOpacity = light.opacity;
    if (light) {
      openEditModal(light);
    }
  }


</script>

<div class="grid" style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell {cell}" >
        {#if cell === 'door'}
          <div class="door-icon"></div>
        {/if}
        {#if $lights.find(light => light.location_x === rowIndex && light.location_y === colIndex)}
          {#each $lights as light}
            {#if light.location_x === rowIndex && light.location_y === colIndex}
              <button class="light" style=
              'background-color: {light.color};
              opacity: {light.opacity}' on:click={event => editLight(event)} data-row={rowIndex} data-col={colIndex} aria-label="Edit light"></button>
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
          Mode:
          <select bind:value={tempMode}>
            {#each $modeOptions as mode}
              <option value={mode}>{mode}</option>
            {/each}
          </select>
        </label>
        <label>
          Opacity:
          <input type="range" min="0" max="1" step="0.01" bind:value={tempOpacity}/>
        </label>
        <button on:click={saveLight}>Save</button>
        <button on:click={closeModal}>Cancel</button>
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

  .wall {
    background-color: black;
  }

  .door-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

</style>



