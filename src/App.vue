<template>
  <div id="app">
    
    <div class="right-main"><router-view/></div>
    
    <leftnav></leftnav>
    

  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
.right-main{
  float: right;
  width: 90%;
  background-color:whitesmoke;
  height: 100%;
}
</style>
