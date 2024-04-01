<?php ?>
<div class="menu">
    <a href="home.php" class="<?=$menu == "home" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-house"></i> Início
    </a>
    <a href="profile.php" class="<?=$menu == "profile" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-user"></i>  Perfil
    </a>
    <a href="friends.php" class="<?=$menu == "friends" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-users"></i> Amigos
    </a>
    <a href="messages.php" class="<?=$menu == "messages" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-envelope"></i> Mensagens
    </a>
    <a href="search.php" class="<?=$menu == "search" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-magnifying-glass"></i> Pesquisa
    </a>
    <a href="games.php" class="<?=$menu == "games" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-gamepad"></i> Jogos
    </a>
    <a href="records.php" class="<?=$menu == "records" ? "menu-selected" : "" ?>">
        <i class="fa-solid fa-trophy"></i> Recordes
    </a>
    <a href="exit.php">
        <i class="fa-solid fa-door-open"></i> Sair
    </a>
</div>