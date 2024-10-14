<script>
  const gridWidth = 30;  // In Columns
  const gridHeight = 40; // In Rows

  // Generate a basic floor plan with walls and doors
  const grid = Array.from({ length: gridHeight }, (_, rowIndex) => {
    return Array.from({ length: gridWidth }, (_, colIndex) => {
      // Define walls and doors
      if (
        // Doorway into apartment
        (rowIndex === 0 && colIndex === 10 )

      ) {
        return 'door'; // Wall on edges
      } 
      // Define doors
      else if ( rowIndex === 0 || rowIndex === gridHeight - 1 || colIndex === 0 || colIndex === gridWidth - 1
      ) {
        return 'wall'; // Specific door positions
      } 
      // Define room areas
      else if (
        // Kitchen: Outline
        (rowIndex === 0 && colIndex >= 0 && colIndex <= 20) || 
        (rowIndex === 20 && colIndex >= 0 && colIndex <= 7) || 
        (colIndex === 0 && rowIndex >= 1 && rowIndex <= 20) || 
        (colIndex === 7 && rowIndex >= 1 && rowIndex <= 20) ||
        // Bedroom: Outline
        (rowIndex === 20 && colIndex >= 13 && colIndex <= 30) || 
        // (rowIndex === 40 && colIndex >= 13 && colIndex <= 30) || 
        // (colIndex === 13 && rowIndex >= 20 && rowIndex <= 40) || 
        // (colIndex === 30 && rowIndex >= 20 && rowIndex <= 40) ||
        // Bathroom: Outline
        (rowIndex === 20 && colIndex >= 7 && colIndex <= 13) ||
        (rowIndex === 33 && colIndex >= 7 && colIndex <= 13) ||
        // (colIndex === 7 && rowIndex >= 20 && rowIndex <= 33) ||
        (colIndex === 7 && rowIndex >= 20 && rowIndex <= 40) ||
        // Closet: Outline
        // (rowIndex === 33 && colIndex >= 13 && colIndex <= 33) ||
        (rowIndex === 40 && colIndex >= 13 && colIndex <= 33) ||
        (colIndex === 13 && rowIndex >= 33 && rowIndex <= 40) ||
        (colIndex === 33 && rowIndex >= 33 && rowIndex <= 40) 
      ) {
        return 'wall'; // Room areas
      }
      return null; // Empty space
    });
  });

  let lights = new Set();

  function toggleLight(x, y) {
    const position = `${x},${y}`;
    if (lights.has(position)) {
      lights.delete(position);
    } else {
      lights.add(position);
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
        {#if lights.has(`${colIndex},${rowIndex}`)}
          <div class="light"></div>
        {/if}
      </div>
    {/each}
  {/each}
</div>

<style>
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

  .light {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: yellow;
    border-radius: 50%;
  }

  .door-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: brown;
  }
</style>



