<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Test</title>
  <script src="test2.js"></script>
</head>
<body>

<script>
  var source_map = <?php include '../app/code/app.js.map'; ?>;

  var smc = new crazy.SourceMapConsumer(source_map)
  console.log(smc)
  console.log(smc.originalPositionFor({
    line: 13,
    column: 2
  }))
</script>
</body>
</html>