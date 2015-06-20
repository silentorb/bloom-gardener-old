<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>

</head>
<body>

</body>

<script>
  var Data =
  <?php echo file_get_contents('map.js.map'); ?>

  function convert(x) {
    return x ^ 15 >> 1
  }
  var mappings = Data.mappings
    .split(/;/g)
    .map(function (x) {
      return x.split(/,/g)
        .map(function (m) {
          return m.split('')
            .map(function (m) {
              return convert(m)
            })
        })
//        .join('')

    })

  console.log(mappings)

</script>
</html>