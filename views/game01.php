<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/base.css" />
    <link rel="stylesheet" type="text/css" href="../css/game.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.jsdelivr.net/npm/phaser@v3.80.1/dist/phaser.min.js"></script>
    <title>Game</title>
</head>

<body>    
    <div class="container">
        <?php require_once("header.php"); ?>
        <div class="content">
            <?php $menu = "games"; ?>
            <?php require_once("menu.php"); ?>
            <div id="game"></div>
            <div id="hud">
                <span>Blue Racket</span>
                <div>Score: <span id="score">0</span></div>
                <div>Speed: <span id="speed">150</div>
                <div><img src="./assets/element_blue_square.png" /> <span id="blocks">50</span></div>
                <span id="status">3</span>
            </div>
        </div>
        <?php require_once("footer.php"); ?>
    </div>

    <script src="../js/game.js"></script>
    
</body>

</html>