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
        $date = date( 'm/d/y' );
        $pickupDate = date( 'm/d/y', strtotime( '+3 day' ) );

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
            $discount = $total * .1;
            $total -= $discount;
          } break;
          default: { // 5 or more shoes
            $discount = $total * .25;
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
  
              <p> '.$fName.' '.$lName.', you have ordered '.$qty.' '.$shoeN.' '.$shoeOrShoes.' </p>
              <p> Placed on: '.$date.' </p>
              <p> Expected '.$deliveryMethod.': '.$pickupDate.' </p>
              <br />
              <p> '.$street.' </p>
              <p> '.$city.', '.$state.' '.$zip.' </p>
              <br />
              <p> Total: $'.number_format( $total, 2 ).' </p>
              <p> Saved: $'.number_format( $discount, 2 ).' </p>
              <a class="close" href="./order.php?selected='.$selected.'&qty='.$qty.'&fName='.$fName.'&lName='.$lName.'&delivery='.$deliveryMethod.'&street='.$street.'&city='.$city.'&state='.$state.'&zip='.$zip.'"> Close </a>
            </div>
          </div>';
        }
        else { // pick up orders won't need an address or any association
          echo 
          '<div class="confirmation">
            <div class="box">
              <div class="header">
                <h2> PURCHASE COMPLETE </h2>
              </div>
  
              <p> '.$fName.' '.$lName.', you have ordered '.$qty.' '.$shoeN.' '.$shoeOrShoes.' </p>
              <p> Placed on: '.$date.' </p>
              <p> Expected '.$deliveryMethod.': '.$pickupDate.' </p>
              <br />
              <p> Total: $'.number_format( $total, 2 ).' </p>
              <p> Saved: $'.number_format( $discount, 2 ).' </p>
              <a class="close" href="./order.php?selected='.$selected.'&qty='.$qty.'&fName='.$fName.'&lName='.$lName.'&delivery='.$deliveryMethod.'"> Close </a>
            </div>
          </div>';
        }

        // open file
        $file = 'orders.json';
        $current = file_get_contents( $file );

        // define the data we want to save to file
        $order = new stdClass();
        $order -> date = date( 'm-d-y' ); // just 1 \, but 2 are needed to breakout
        $order -> fullName = $fName." ".$lName;

        if( $deliveryMethod === 'delivery' ) {// deliveries need addresses with associated data
          $order -> address = $street." ".$city.", ".$state." ".$zip;
        }

        $order -> totalPaid = round( $total, 2 );

        // convert object into a json string
        $orderData = json_encode( $order );

        // append to previous data
        if( $current ) { // if previous data exists
          // open up the array
          $current = trim( $current, '[' );
          $current = trim( $current, ']' );

          // so we can append a new order object
          $current .= ",\n".$orderData;
        }
        else {
          $current .= $orderData;
        }

        // save that data to file within a new array
        file_put_contents( $file, "[".$current."]" );
    }
?>