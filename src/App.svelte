<script>

</script>

<body>
  <header>
    <img src="src\assets\lightbulb.png" alt="" width="100px">
    <h1 class="title">Smart Lightbulb</h1>
  </header>
  <nav>
    <ul>
      <li>Controls</li>
      <li>|</li>
      <li>Indicators</li>
      <li>|</li>
      <li>Settings</li>
    </ul>
  </nav>
  <main>
    <!-- WE GOT 2 OPTIONS IMO, 1.) ALL ON ONE PAGE HIDE AND BLOCK DISPLAY 2.) SEPERATE PAGES FOR EACH LI ^^ -->
    <!-- FOR NOW I WILL JUST HIDE AND BLOCK -->
     <div class="controls"></div>
     <div class="indicators" style="display: none;"></div>
     <div class="settings" style="display: none;"></div>
  </main>
</body>

<style>
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

  header {
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: center; 
    gap: 20px;

    position: absolute;
    top: 0;
    color: white;
    height: 15%;

    width: 100%;
    padding: 20px;
    
    background-image: url('/src/assets/header-background.jpg');
    background-position: 20px 600px;
    border-bottom: rgba(216, 216, 216, 0.6) 2px solid;
  }

  nav {
    position: relative;

    width: 100%;
    top: 167px;

    background-color: rgb(243, 243, 243);
  }

  ul {
    list-style: none;

    padding: 10px 0px;

    display: flex;
    flex-direction: row;
    gap: 30px;

    justify-content: center;
  }

  li:hover {
    cursor: pointer;
  }

  main{
    position: relative;
    background-color: red;
  }
</style>
