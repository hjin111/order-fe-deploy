<template>
    <div class="page-container">
      <nav class="longin-nav">
        <ul class="nav-links">
        <li><a href="#">LOGIN</a></li>
        <li><a href="#">JOIN</a></li>
        <li><a href="#">INQUIRY</a></li>
      </ul>
      </nav>
      <nav class="top-nav">
        <ul class="nav-menu">
          <li><a href="#">INTRODUCE</a></li>
          <li><a href="#">RESERVATION</a></li>
          <li><a href="#" style="font-size: 40px;">FLINT HOTEL</a></li>
          <li><a href="#">DINING</a></li>
          <li><a href="#">ROOM</a></li>
        </ul>
      </nav>
      <div class="image-container">
        <img src="@/assets/image.png" alt="background image">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // 필요한 컴포넌트 로직 작성
  };
  </script>
  
  <style scoped>
  .page-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .longin-nav{
    position: absolute;
    top: 20px;
    width: 95%;
    display: flex;
    justify-content: right;
    color: white;
    z-index: 10;
  }

  .nav-links
 {

    font-family: 'Playfair Display';
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 0px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;


    list-style: none;
    display: flex;
    align-items: center;

    gap: 20px;

  }
  .top-nav {
    position: absolute;
    top: 0;
    width: 93%;
    display: flex;
    justify-content: center;
    padding: 55px;
    color: white;
    z-index: 10;
  }
  
  .nav-menu
 {

    font-family: 'Playfair Display';
    font-style: normal;
    font-weight: 0;
    font-size: 25px;
    line-height: 0px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;


    list-style: none;
    display: flex;
    align-items: center;

    gap: 80px;

  }
  
  .nav-menu a,
  .nav-links a {
    text-decoration: none;
    color: white;
    font-weight: 500;
  }
  
  .image-container {
    width: 100%;
    height: 100%;
  }
  
  .image-container img {
    width: 1519.2px;
    height: 740px;
   
    position: relative;
  }


  </style>
  