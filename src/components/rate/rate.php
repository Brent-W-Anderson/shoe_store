<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Leave a rating</title>
  </head>

  <body>
    <div id="rateRoot"></div>
    
    <script src="./bundle.js"></script>
  </body>
</html>

<?php
  if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    $shoeN = $_POST['shoes'];
    $rating = $_POST['rating'];
    $message = $_POST['message'];

    echo 
    '<div class="confirmation">
      <div class="box">
        <div class="header">
          <h2> REVIEW COMPLETE </h2>
        </div>

        <p> Thanks for the '.$rating.' star rating on our '.$shoeN.' shoes! </p>
        <br />
        <p> You can see your review from the homepage. </p>
        <br />
        <br />

        <a class="close" href="./index.php"> Close </a>
      </div>
    </div>';

    // open file
    $file = 'reviews.json';
    $current = file_get_contents( $file );

    // define the data we want to save to file
    $review = new stdClass(); // new object
    $review -> shoe = $shoeN;
    $review -> rating = $rating;
    $review -> message = $message;

    // convert to json string.
    $reviewData = json_encode( $review );

    // append to previous data
    if( $current ) { // if previous data exists
      $current = trim( $current, "[]\n" );

      // save that data to file as json
      file_put_contents( $file, "[\n".$current.",\n\t".$reviewData."\n]" );
    }
    else {
      // save that data to file as json
      file_put_contents( $file, "[\n\t".$reviewData."\n]" );
    }
  }
?>