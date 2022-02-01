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
    $selected = $_GET['selected'];
    $qty = 1;

    if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
        $shoeN = $_POST['shoes'];
        $qty = $_POST['qty'];
        $delivery = $_POST['delivery'];
        $price = $_POST['price'];

        $amount = $price * $qty;
        $flatRate = 5;
        $tax = .1 * $amount;

        $total = $amount + $tax + $flatRate;

        $date = date( 'd/m/y' );
        $pickup = date( 'd/m/y', strtotime( '+3 day' ) );

        echo 
        '<div class="confirmation">
          <div class="box">
            <div class="header">
              <h2> PURCHASE COMPLETE </h2>
            </div>

            <p> shoe: '.$shoeN.' </p>
            <p> quantity: '.$qty.' </p>
            <br />
            <p> order placed: '.$date.' </p>
            <p> pickup date: '.$pickup.' </p>
            <p> delivery: '.$delivery.' </p>
            <br />
            <p> total: $'.round( $total, 2 ).' </p>
            <a class="close" href="./order.php?selected='.$selected.'&qty='.$qty.'&delivery='.$delivery.'"> Close </a>
          </div>
        </div>';
    }
?>