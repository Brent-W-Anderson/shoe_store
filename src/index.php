<!DOCTYPE html>

<?php
  // open file
  $file = './reviews.json';

  // append to previous data
  if( file_exists( $file ) ) { // if previous data exists
    $current = file_get_contents( $file );
    $current = json_decode( $current );

    $current = str_replace( array( 'ghastly', 'repulsive', 'appalling', 'horrendous' ), '#bad', $current );

    echo "<div style='display:none;' id='data'>".json_encode( $current )."</div>";
    file_put_contents( './reviews.json', json_encode( $current ) );
  }
  else {
    file_put_contents( './reviews.json', "" );
  }
?>

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>shoe store</title>
  </head>

  <body>
    <div id="root"></div>
    
    <script src="./bundle.js"></script>
  </body>
</html>