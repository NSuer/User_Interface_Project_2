<script>
   let showControlInfo = false;

   function toggleControlInfo() {
      showControlInfo = !showControlInfo;
   }
 </script>


<div class="info-controls-container" style="flex-direction: column;" >
   <button class="info-controls-button" on:click={toggleControlInfo}>
      {showControlInfo ? 'Hide Info' : 'Show Info'}
   </button>

   {#if showControlInfo}
      <div class="info-controls-box">
         <p>This control panel simulates voice controls. Click the run button next to a voice control to see the effect of the corresponding control. Where applicable, changing the group or color for a setting will change what lights are affected by the effect or the color of the effect.</p>
      </div>
   {/if}
</div>
 
 <style>
   
   .info-controls-container {
      display: flex;
      align-items: flex-start;
      width: 100%;
   }

   .info-controls-button {
      position: relative;
      padding: 0.5rem;
      background-color: rgb(251, 203, 51);   
      color: black;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      width: 97%;
      margin-left: 0.5rem;
      bottom: 7px;
   }

   .info-controls-box {
      background-color: #f8f9fa;     
      padding: 0.25rem;                 
      border: 0.1rem solid #ddd;             
      border-radius: 0.5rem;        
      font-size: 1rem;               
      width: 96%; 
      margin-left: 0.5rem;              
   }

   
 </style>