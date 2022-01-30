<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>order form</title>
  </head>

  <body>
    <div id="order"></div>
    
    <script src="./bundle.js"></script>
  </body>
</html>

<?php
    $xVal = null;

    if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
        $xVal = $_POST['xName'];
    }

    echo '<p class="confirmation">'.$xVal.'</p>';
?>