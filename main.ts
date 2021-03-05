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
function get_valid_pawn_spot (piece: Sprite) {
    local_valid_spots = []
    if (sprites.readDataBoolean(piece, "color")) {
        if (grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece), grid.spriteRow(piece) + 1)).length == 0) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), 0, 1))
        }
        local_other_piece = grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece) - 1, grid.spriteRow(piece) + 1))
        if (local_other_piece.length > 0 && !(sprites.readDataBoolean(local_other_piece[0], "color"))) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), -1, 1))
        }
        local_other_piece = grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece) + 1, grid.spriteRow(piece) + 1))
        if (local_other_piece.length > 0 && !(sprites.readDataBoolean(local_other_piece[0], "color"))) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), 1, 1))
        }
    } else {
        if (grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece), grid.spriteRow(piece) - 1)).length == 0) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), 0, -1))
        }
        local_other_piece = grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece) - 1, grid.spriteRow(piece) - 1))
        if (local_other_piece.length > 0 && sprites.readDataBoolean(local_other_piece[0], "color")) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), -1, -1))
        }
        local_other_piece = grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece) + 1, grid.spriteRow(piece) - 1))
        if (local_other_piece.length > 0 && sprites.readDataBoolean(local_other_piece[0], "color")) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), 1, -1))
        }
    }
    return local_valid_spots
}
function prepare_text () {
    sprite_text_player_label = textsprite.create("Player:", 0, 15)
    sprite_text_player_label.top = 16
    sprite_text_player_label.left = 92
    sprite_text_current_player = textsprite.create("", 0, 15)
    sprite_text_current_player.top = sprite_text_player_label.bottom
    sprite_text_current_player.left = sprite_text_player_label.left + 1
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    selected_piece = false
    make_tilemap(false)
})
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
    if (sprites.readDataString(piece, "type") == "rook") {
        return get_valid_rook_spot(piece)
    } else if (sprites.readDataString(piece, "type") == "knight") {
        return get_valid_knight_spot(piece)
    } else if (sprites.readDataString(piece, "type") == "bishop") {
        return get_valid_bishop_spot(piece)
    } else if (sprites.readDataString(piece, "type") == "king") {
        return get_valid_king_spot(piece)
    } else if (sprites.readDataString(piece, "type") == "queen") {
        return get_valid_queen_spot(piece)
    } else {
        return get_valid_pawn_spot(piece)
    }
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
            if (sprites.readDataBoolean(pieces_clicked[0], "color") == active_player) {
                sprite_selected_piece = pieces_clicked[0]
                valid_spots = get_valid_spots(sprite_selected_piece)
                for (let location of valid_spots) {
                    if (within(tiles.locationXY(location, tiles.XY.row), 2, 9, true) && within(tiles.locationXY(location, tiles.XY.column), 2, 9, true)) {
                        if (tiles.tileAtLocationEquals(location, assets.tile`dark_tile`)) {
                            tiles.setTileAt(location, assets.tile`green_tile_on_dark`)
                        } else {
                            tiles.setTileAt(location, assets.tile`green_tile_on_light`)
                        }
                    }
                }
                selected_piece = true
            } else {
                scene.cameraShake(4, 200)
            }
        }
    } else {
        if (sprite_selected_piece) {
            if (tiles.tileIs(tiles.locationOfSprite(sprite_cursor_pointer), assets.tile`green_tile_on_dark`) || tiles.tileIs(tiles.locationOfSprite(sprite_cursor_pointer), assets.tile`green_tile_on_light`)) {
                if (grid.getSprites(tiles.locationOfSprite(sprite_cursor_pointer)).length > 0) {
                    grid.getSprites(tiles.locationOfSprite(sprite_cursor_pointer))[0].destroy()
                }
                sprites.setDataBoolean(sprite_selected_piece, "moved", true)
                grid.place(sprite_selected_piece, tiles.locationOfSprite(sprite_cursor_pointer))
                active_player = !(active_player)
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
        tiles.setSmallTilemap(tilemap`board_with_tile_pieces`)
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
    sprites.setDataBoolean(sprite, "moved", false)
}
let sprite_cursor: Sprite = null
let sprite_cursor_pointer: Sprite = null
let pieces_clicked: Sprite[] = []
let sprite_text_current_player: TextSprite = null
let sprite_text_player_label: TextSprite = null
let local_other_piece: Sprite[] = []
let local_valid_spots: tiles.Location[] = []
let local_location: tiles.Location = null
let valid_spots: tiles.Location[] = []
let sprite_selected_piece: Sprite = null
let selected_piece = false
let active_player = false
active_player = false
selected_piece = false
sprite_selected_piece = null
valid_spots = []
make_cursor()
scene.setBackgroundColor(13)
make_tilemap(true)
make_pieces()
make_tilemap(false)
prepare_text()
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
forever(function () {
    if (active_player) {
        sprite_text_current_player.setText("Black")
    } else {
        sprite_text_current_player.setText("White")
    }
    pause(100)
})
