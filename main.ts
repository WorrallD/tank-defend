namespace SpriteKind {
    export const walling = SpriteKind.create()
    export const enemy_projectile = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    player_1.setPosition(0, player_1.y - -5)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(player_1, 100, 75)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile.setPosition(player_1.x, player_1.y)
    projectile.setVelocity(0, -170)
    music.pewPew.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(player_1, 100, 75)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(player_1, 100, 75)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    health_bar.value += -34
    enemy1.setPosition(randint(0, 10) * 10, randint(0, 10) * 10)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(player_1, 100, 75)
})
info.onLifeZero(function () {
    game.over(false)
    game.showLongText("GAME OVER", DialogLayout.Center)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    pause(200)
    enemy_bar.value += -50
})
let enemy_bar: StatusBarSprite = null
let health_bar: StatusBarSprite = null
let enemy1: Sprite = null
let player_1: Sprite = null
let projectile: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
info.setLife(2)
info.setScore(0)
projectile = sprites.create(img`
    4 
    5 
    5 
    `, SpriteKind.Projectile)
player_1 = sprites.create(assets.image`player L1`, SpriteKind.Player)
enemy1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . b b 2 2 2 2 2 2 2 2 2 2 b b . 
    . b b 2 2 2 2 2 2 2 2 2 2 b b . 
    . b b 2 2 2 2 e e 2 2 2 2 b b . 
    . b b 2 2 2 e e e e 2 2 2 b b . 
    . . . 2 2 e e e e e e 2 2 . . . 
    . . . 2 e e e 5 5 e e e 2 . . . 
    . . . 2 e e e 5 5 e e e 2 . . . 
    . . . 2 2 e e 5 5 e e 2 2 . . . 
    . . . 2 2 2 e 5 5 e 2 2 2 . . . 
    . b b 2 2 2 2 5 5 2 2 2 2 b b . 
    . b b 2 2 2 2 5 5 2 2 2 2 b b . 
    . b b 2 2 2 2 5 5 2 2 2 2 b b . 
    . b b 2 2 2 2 5 5 2 2 2 2 b b . 
    . . . . . . 5 5 5 5 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
projectile.setPosition(0, 0)
player_1.setStayInScreen(true)
health_bar = statusbars.create(20, 4, StatusBarKind.Health)
health_bar.value = 100
health_bar.attachToSprite(player_1, -5, 20)
health_bar.setLabel("HP")
health_bar.setColor(7, 2, 5)
enemy_bar = statusbars.create(20, 4, StatusBarKind.Health)
let enemy_health = 10
enemy_bar.value = enemy_health
enemy_bar.attachToSprite(enemy1, -5, 20)
player_1.sayText("all you need to get is 50 points", 5000, true)
let enemy_speed = 20
enemy1.follow(player_1, 20)
enemy1.setPosition(randint(0, 10) * 10, randint(0, 10) * 10)
forever(function () {
    scene.centerCameraAt(player_1.x, player_1.y - 40)
})
forever(function () {
    if (info.score() == 50) {
        game.over(true, effects.clouds)
        game.showLongText("YOU WIN", DialogLayout.Center)
    }
})
forever(function () {
    if (health_bar.value == 0) {
        info.changeLifeBy(-1)
        health_bar.value = 100
    }
    if (enemy_bar.value == 0) {
        enemy1.setPosition(randint(0, 10) * 10, randint(0, 10) * 10)
        enemy_health += enemy_health + 10
        enemy_speed += 0.5
        info.changeScoreBy(1)
        enemy_bar.value = enemy_health
        enemy1.follow(player_1, enemy_speed)
    }
})
forever(function () {
    if (info.score() == -1) {
        info.setScore(0)
    }
})
