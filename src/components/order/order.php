<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>order form</title>
  </head>

  <body>
    <div id="orderRoot"></div>
    
    <script src="./bundle.js"></script>
  </body>
</html>

<?php
    if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
        // variables
        $shoeN = $_POST['shoes'];
        $qty = $_POST['qty'];
        $price = $_POST['price'];
        $fName = $_POST['fName'];
        $lName = $_POST['lName'];
        $deliveryMethod = $_POST['delivery'];

        // dates
        date_default_timezone_set('America/Chicago'); // central timezone.
        $date = date( 'm/d/Y' );
        $pickupDate = date( 'm/d/Y', strtotime( '+3 day' ) );

        // total price calculations with taxes (10%).
        $amount = $price * $qty;
        $flatRate = 5;
        $tax = .1 * $amount;

        $total = $amount + $tax + $flatRate;

        // discounts on amount:
        $discount = 0;
        $shoeOrShoes = 'shoes';
        switch( $qty ) {
          case 1: { // only 1 shoe
            $shoeOrShoes = 'shoe';
          } break;
          case ( $qty <= '4' ): { // 2 - 4 shoes
            $discount = $total * .1; // small discount
            $total -= $discount;
          } break;
          default: { // 5 or more shoes
            $discount = $total * .25; // big discount
            $total -= $discount;
          }
        };

        // shipping fee:
        $shippingFee = 0;
        if( $total < '50' && $deliveryMethod === 'delivery' ) {
          $shippingFee = 6.95;
          $total += $shippingFee;
        }
        else {
          $discount += 6.95;
        }

        if( $deliveryMethod === 'delivery' ) {// deliveries need addresses with associated data
          $street = $_POST['street'];
          $city = $_POST['city'];
          $state = $_POST['state'];
          $zip = $_POST['zip'];

          echo 
          '<div class="confirmation">
            <div class="box">
              <div class="header">
                <h2> PURCHASE COMPLETE </h2>
              </div>
  
              <p> <b>'.$fName.' '.$lName.'</b>, you have ordered <b>'.$qty.' '.$shoeN.'</b> '.$shoeOrShoes.' </p>
              <p> <b>Placed on:</b> '.$date.' </p>
              <p> <b>Expected '.$deliveryMethod.':</b> '.$pickupDate.' </p>
              <ul>
                <li class="address"> '.strtoupper( str_replace( '.', '' , $street ) ).' </li>
                <li class="address"> '.strtoupper( $city ).' '.strtoupper( $state ).' '.strtoupper( $zip ).' </li>                
              </ul>
              <br />
              <p> <b>Total:</b> $'.number_format( $total, 2 ).' </p>
              <p> <b>Saved:</b> $'.number_format( $discount, 2 ).' </p>
              <a class="close" href="./index.html"> Close </a>
            </div>
          </div>';
        }
        else {
          echo 
          '<div class="confirmation">
            <div class="box">
              <div class="header">
                <h2> PURCHASE COMPLETE </h2>
              </div>

              <p> <b>'.$fName.' '.$lName.'</b>, you have ordered <b>'.$qty.' '.$shoeN.'</b> '.$shoeOrShoes.' </p>
              <p> <b>Placed on:</b> '.$date.' </p>
              <p> <b>Expected '.$deliveryMethod.':</b> '.$pickupDate.' </p>
              <br />
              <p> <b>Total:</b> $'.number_format( $total, 2 ).' </p>
              <p> <b>Saved:</b> $'.number_format( $discount, 2 ).' </p>
              <a class="close" href="./index.html"> Close </a>
            </div>
          </div>';
        }

        // open file
        $file = 'orders.json';
        $current = file_get_contents( $file );

        // define the data we want to save to file
        $order = new stdClass();
        $order -> date = date( 'm-d-Y' );
        $order -> fullName = $lName.", ".$fName;

        if( $deliveryMethod === 'delivery' ) {// deliveries need addresses with associated data
          $order -> address = strtoupper( str_replace( '.', '' , $street )." ".$city." ".$state." ".$zip );
        }

        $order -> totalPaid = floatVal( number_format( $total, 2 ) );

        // convert to json string.
        $orderData = json_encode( $order );

        // append to previous data
        if( $current ) { // if previous data exists
          $current = trim( $current, "[]\n" );

          // save that data to file as json
          file_put_contents( $file, "[\n".$current.",\n\t".$orderData."\n]" );
        }
        else {
          // save that data to file as json
          file_put_contents( $file, "[\n\t".$orderData."\n]" );
        }
    }
?>