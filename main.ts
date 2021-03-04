function make_cursor () {
    sprite_cursor = sprites.create(assets.image`cursor`, SpriteKind.Player)
    sprite_cursor_pointer = sprites.create(assets.image`cursor_pointer`, SpriteKind.Player)
    sprite_cursor.z = 49
    sprite_cursor_pointer.z = 50
    sprite_cursor_pointer.setFlag(SpriteFlag.StayInScreen, true)
    scene.cameraFollowSprite(sprite_cursor_pointer)
    enable_cursor(true)
}
function make_tilemap (with_piece_tiles: boolean) {
    if (with_piece_tiles) {
        tiles.setSmallTilemap(tilemap`board_with_tile_pieces`)
    } else {
        tiles.setSmallTilemap(tilemap`board`)
    }
}
function enable_cursor (enable: boolean) {
    if (enable) {
        controller.moveSprite(sprite_cursor_pointer, 100, 100)
    } else {
        controller.moveSprite(sprite_cursor_pointer, 0, 0)
    }
}
let sprite_cursor_pointer: Sprite = null
let sprite_cursor: Sprite = null
make_cursor()
scene.setBackgroundColor(13)
make_tilemap(true)
make_tilemap(false)
game.onUpdate(function () {
    sprite_cursor.top = sprite_cursor_pointer.top
    sprite_cursor.left = sprite_cursor_pointer.left
})
