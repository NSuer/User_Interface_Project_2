<script>
  let navValue = "Controls";
  let button1, button2, button3;

  function animate(val) {
    if (val == 1){
      button1.animate(
        [{ background: 'lightgray' }],
        { duration: 200, direction: 'alternate', iterations: 2 },
      )
      navValue = 'Controls';
    }
    else if (val == 2) {
      button2.animate(
        [{ background: 'lightgray' }],
        { duration: 200, direction: 'alternate', iterations: 2 },
      )
      navValue = 'Indicators';
    }
    else {
      button3.animate(
        [{ background: 'lightgray' }],
        { duration: 200, direction: 'alternate', iterations: 2 },
      )
      navValue = 'Settings';
    }
		
	}

</script>

<body>
  <header>
    <div class="titleAndImg">
      <h1 class="title" style="color: var(--yellow)" >The Smart Lightbulb</h1>
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
  <div class="spacer" style="bottom: 15px;"></div>
  <main>
    <div class="grid">

    </div>
    <div class="information">
      <nav>
        <h2 style="position:relative; left: 2.5%;">Controls</h2>
        <ul>
          <li bind:this={button1} on:click={() => animate(1)}>Controls</li>
          <li bind:this={button2} on:click={() => animate(2)}>Indicators</li>
          <li bind:this={button3} on:click={() => animate(3)}>Settings</li>
        </ul>
      </nav>
      <div class="spacer"></div>
      <div class="navText">
        {#if navValue == "Controls"}
          <p>Controls body text</p>
        {:else if navValue == "Indicators"}
          <p>Indicators body text</p>
        {:else}
          <p>Settings body text</p>
        {/if}
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

    background-color: rgb(255, 255, 255);
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    color: black;

    padding: 0;
    margin: 0;
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
    font-size: 3em;
    padding: 0;
  }

  .titleAndImg {
    position: relative; 

    display: flex; 
    flex-direction: row; 
    justify-content: center;

    height:fit-content;
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

  li {
    position: relative;
    padding: 5px 10px;
    border: 1px solid rgba(85, 85, 85, 0.25);
    
    border-radius: 10px;
  }

  li:hover {
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
    left: 2.5%;

    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .grid {
    position: relative;

    border: 1px solid black;
    width: 50%;
  }

  .information {
    position: relative;
    border: 2px solid rgb(102, 102, 102, 0.3);
    border-radius: 20px;

    width: 50%;
  }
  
  .navText {
    position: relative;

    /*border: 1px solid black;*/
    width: 100%;
    height: 90%;
    left: 2.5%;
  }

  footer {
    position: absolute;

    width: 95%;
    left: 2.5%;
    top: 97.5%;

    text-align: center;
    color: rgb(102, 102, 102);
  }
</style>
