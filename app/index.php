<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Garden</title>

  <script src="lib/jquery/dist/jquery.min.js"></script>
  <script src="lib/webcomponentsjs/webcomponents-lite.min.js"></script>

  <!--Loading Angular just for its promises; one of the few implementations that don't need require.js-->
  <script src="lib/angular/angular.js"></script>

  <script src="code/bloom.js"></script>
  <script src="code/app.js"></script>

  <link rel="stylesheet" href="styles/garden.css">

</head>
<body>
  <header>Garden</header>
  <footer></footer>
  <?php echo file_get_contents('code/flowers/templates.html'); ?>
</body>
<script>
  bloom.Garden.start()
</script>
</html>