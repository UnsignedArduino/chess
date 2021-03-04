namespace SpriteKind {
    export const Piece = SpriteKind.create()
}
function check_location (piece: Sprite, d_col: number, d_row: number) {
    local_location = grid.add(grid.getLocation(piece), d_col, d_row)
    if (grid.getSprites(local_location).length == 0) {
        local_valid_spots.push(grid.add(grid.getLocation(piece), d_col, d_row))
        return true
    } else if (sprites.readDataBoolean(grid.getSprites(local_location)[0], "color") != sprites.readDataBoolean(piece, "color")) {
        local_valid_spots.push(grid.add(grid.getLocation(piece), d_col, d_row))
        return false
    } else {
        return false
    }
}
function get_valid_bishop_spot (piece: Sprite) {
    local_valid_spots = []
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, (index + 1) * -1, (index + 1) * -1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, index + 1, index + 1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, (index + 1) * -1, index + 1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, index + 1, (index + 1) * -1))) {
            break;
        }
    }
    return local_valid_spots
}
function get_valid_spots (piece: Sprite) {
    return get_valid_queen_spot(piece)
}
function make_pieces () {
    for (let location of tiles.getTilesByType(assets.tile`white_rook_tile`)) {
        make_piece(sprites.create(assets.image`white_rook`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "rook", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`white_knight_tile`)) {
        make_piece(sprites.create(assets.image`white_knigh`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "knight", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`white_bishop_tile`)) {
        make_piece(sprites.create(assets.image`white_bishop`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "bishop", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`white_king_tile`)) {
        make_piece(sprites.create(assets.image`white_king`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "king", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`white_queen_tile`)) {
        make_piece(sprites.create(assets.image`white_queen`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "queen", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`white_pawn_tile`)) {
        make_piece(sprites.create(assets.image`white_pawn`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "pawn", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`black_rook_tile`)) {
        make_piece(sprites.create(assets.image`black_rook`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "rook", true)
    }
    for (let location of tiles.getTilesByType(assets.tile`black_knight_tile`)) {
        make_piece(sprites.create(assets.image`black_knight`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "knight", true)
    }
    for (let location of tiles.getTilesByType(assets.tile`black_bishop_tile`)) {
        make_piece(sprites.create(assets.image`black_bishop`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "bishop", true)
    }
    for (let location of tiles.getTilesByType(assets.tile`black_king_tile`)) {
        make_piece(sprites.create(assets.image`black_king`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "king", true)
    }
    for (let location of tiles.getTilesByType(assets.tile`black_queen_tile`)) {
        make_piece(sprites.create(assets.image`black_queen`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "queen", true)
    }
    for (let location of tiles.getTilesByType(assets.tile`black_pawn_tile`)) {
        make_piece(sprites.create(assets.image`black_pawn`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "pawn", true)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(selected_piece)) {
        pieces_clicked = grid.getSprites(tiles.locationOfSprite(sprite_cursor_pointer))
        if (pieces_clicked.length > 0) {
            sprite_selected_piece = pieces_clicked[0]
            valid_spots = get_valid_spots(sprite_selected_piece)
            for (let location of valid_spots) {
                if (within(tiles.locationXY(location, tiles.XY.row), 1, 8, true) && within(tiles.locationXY(location, tiles.XY.column), 2, 9, true)) {
                    tiles.setTileAt(location, assets.tile`green_tile`)
                }
            }
            selected_piece = true
        }
    } else {
        if (sprite_selected_piece) {
            if (tiles.tileIs(tiles.locationOfSprite(sprite_cursor_pointer), assets.tile`green_tile`)) {
                if (grid.getSprites(tiles.locationOfSprite(sprite_cursor_pointer)).length > 0) {
                    grid.getSprites(tiles.locationOfSprite(sprite_cursor_pointer))[0].destroy()
                }
                grid.place(sprite_selected_piece, tiles.locationOfSprite(sprite_cursor_pointer))
            } else {
                scene.cameraShake(4, 200)
            }
            make_tilemap(false)
        }
        selected_piece = false
    }
})
function get_valid_knight_spot (piece: Sprite) {
    local_valid_spots = []
    check_location(piece, 2, 1)
    check_location(piece, 2, -1)
    check_location(piece, -2, 1)
    check_location(piece, -2, -1)
    check_location(piece, 1, 2)
    check_location(piece, 1, -2)
    check_location(piece, -1, 2)
    check_location(piece, -1, -2)
    return local_valid_spots
}
function make_cursor () {
    sprite_cursor = sprites.create(assets.image`cursor`, SpriteKind.Player)
    sprite_cursor_pointer = sprites.create(assets.image`cursor_pointer`, SpriteKind.Player)
    sprite_cursor.z = 49
    sprite_cursor_pointer.z = 50
    sprite_cursor_pointer.setFlag(SpriteFlag.StayInScreen, true)
    scene.cameraFollowSprite(sprite_cursor_pointer)
    enable_cursor(true)
}
function get_valid_king_spot (piece: Sprite) {
    local_valid_spots = []
    check_location(piece, 0, -1)
    check_location(piece, 1, -1)
    check_location(piece, 1, 0)
    check_location(piece, 1, 1)
    check_location(piece, 0, 1)
    check_location(piece, -1, 1)
    check_location(piece, -1, 0)
    check_location(piece, -1, -1)
    return local_valid_spots
}
function make_tilemap (with_piece_tiles: boolean) {
    if (with_piece_tiles) {
        tiles.setSmallTilemap(tilemap`board_for_test`)
    } else {
        tiles.setSmallTilemap(tilemap`board`)
    }
}
function within (x: number, minimum: number, maximum: number, inclusive: boolean) {
    if (inclusive) {
        return x >= minimum && x <= maximum
    } else {
        return x > minimum && x < maximum
    }
}
function enable_cursor (enable: boolean) {
    if (enable) {
        controller.moveSprite(sprite_cursor_pointer, 100, 100)
    } else {
        controller.moveSprite(sprite_cursor_pointer, 0, 0)
    }
}
function get_valid_rook_spot (piece: Sprite) {
    local_valid_spots = []
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, 0, (index + 1) * -1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, 0, index + 1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, (index + 1) * -1, 0))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, index + 1, 0))) {
            break;
        }
    }
    return local_valid_spots
}
function get_valid_queen_spot (piece: Sprite) {
    local_valid_spots = []
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, 0, (index + 1) * -1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, 0, index + 1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, (index + 1) * -1, 0))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, index + 1, 0))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, (index + 1) * -1, (index + 1) * -1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, index + 1, index + 1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, (index + 1) * -1, index + 1))) {
            break;
        }
    }
    for (let index = 0; index <= 7; index++) {
        if (!(check_location(piece, index + 1, (index + 1) * -1))) {
            break;
        }
    }
    return local_valid_spots
}
function make_piece (sprite: Sprite, col: number, row: number, _type: string, color: boolean) {
    grid.place(sprite, tiles.getTileLocation(col, row))
    sprites.setDataString(sprite, "type", _type)
    sprites.setDataBoolean(sprite, "color", color)
}
let sprite_cursor: Sprite = null
let sprite_cursor_pointer: Sprite = null
let pieces_clicked: Sprite[] = []
let local_valid_spots: tiles.Location[] = []
let local_location: tiles.Location = null
let valid_spots: tiles.Location[] = []
let sprite_selected_piece: Sprite = null
let selected_piece = false
let debug = true
selected_piece = false
sprite_selected_piece = null
valid_spots = []
make_cursor()
scene.setBackgroundColor(13)
make_tilemap(true)
make_pieces()
make_tilemap(false)
spriteutils.setConsoleOverlay(true)
game.onUpdate(function () {
    sprite_cursor.top = sprite_cursor_pointer.top
    sprite_cursor.left = sprite_cursor_pointer.left
    if (selected_piece) {
        sprite_cursor.image.replace(1, 9)
    } else {
        sprite_cursor.image.replace(9, 1)
    }
})
