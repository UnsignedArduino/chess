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
function get_valid_pawn_spot (piece: Sprite, attack_only: boolean) {
    local_valid_spots = []
    if (sprites.readDataBoolean(piece, "color")) {
        if (attack_only) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), -1, 1))
            local_valid_spots.push(grid.add(grid.getLocation(piece), 1, 1))
        } else {
            if (grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece), grid.spriteRow(piece) + 1)).length == 0) {
                local_valid_spots.push(grid.add(grid.getLocation(piece), 0, 1))
            }
            if (!(sprites.readDataBoolean(piece, "moved"))) {
                if (grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece), grid.spriteRow(piece) + 2)).length == 0) {
                    local_valid_spots.push(grid.add(grid.getLocation(piece), 0, 2))
                }
            }
            local_other_piece = grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece) - 1, grid.spriteRow(piece) + 1))
            if (local_other_piece.length > 0 && !(sprites.readDataBoolean(local_other_piece[0], "color"))) {
                local_valid_spots.push(grid.add(grid.getLocation(piece), -1, 1))
            }
            local_other_piece = grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece) + 1, grid.spriteRow(piece) + 1))
            if (local_other_piece.length > 0 && !(sprites.readDataBoolean(local_other_piece[0], "color"))) {
                local_valid_spots.push(grid.add(grid.getLocation(piece), 1, 1))
            }
        }
    } else {
        if (attack_only) {
            local_valid_spots.push(grid.add(grid.getLocation(piece), -1, -1))
            local_valid_spots.push(grid.add(grid.getLocation(piece), 1, -1))
        } else {
            if (grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece), grid.spriteRow(piece) - 1)).length == 0) {
                local_valid_spots.push(grid.add(grid.getLocation(piece), 0, -1))
            }
            if (!(sprites.readDataBoolean(piece, "moved"))) {
                if (grid.getSprites(tiles.getTileLocation(grid.spriteCol(piece), grid.spriteRow(piece) - 2)).length == 0) {
                    local_valid_spots.push(grid.add(grid.getLocation(piece), 0, -2))
                }
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
    }
    return local_valid_spots
}
function highlight_all_attacked_tiles (piece: Sprite, color: boolean) {
    for (let sprite_piece of sprites.allOfKind(SpriteKind.Piece)) {
        if (sprites.readDataBoolean(sprite_piece, "color") == color) {
            continue;
        }
        if (sprites.readDataString(piece, "type") == sprites.readDataString(sprite_piece, "type")) {
            continue;
        }
        for (let location of get_valid_spots(sprite_piece, true)) {
            if (within(tiles.locationXY(location, tiles.XY.row), 2, 9, true) && within(tiles.locationXY(location, tiles.XY.column), 2, 9, true)) {
                tiles.setTileAt(location, assets.tile`red_tile`)
            }
        }
    }
}
function prepare_text () {
    sprite_text_player_label = textsprite.create("Player:", 0, 15)
    sprite_text_player_label.top = 16
    sprite_text_player_label.left = 92
    sprite_text_current_player = textsprite.create("", 0, 15)
    sprite_text_current_player.top = sprite_text_player_label.bottom
    sprite_text_current_player.left = sprite_text_player_label.left + 1
    sprite_text_white_time_label = textsprite.create(": ", 0, 15)
    sprite_text_white_time_label.top = 34
    sprite_text_white_time_label.left = sprite_text_current_player.left
    sprite_text_white_time_label.setIcon(assets.image`white_knight`)
    sprite_text_white_player_time = textsprite.create("", 0, 15)
    sprite_text_white_player_time.top = 34
    sprite_text_white_player_time.left = sprite_text_white_time_label.right
    sprite_text_black_time_label = textsprite.create(": ", 0, 15)
    sprite_text_black_time_label.top = 44
    sprite_text_black_time_label.left = sprite_text_current_player.left
    sprite_text_black_time_label.setIcon(assets.image`black_knight`)
    sprite_text_player_black_time = textsprite.create("", 0, 15)
    sprite_text_player_black_time.top = 44
    sprite_text_player_black_time.left = sprite_text_black_time_label.right
    sprite_text_moves_found = textsprite.create("", 0, 15)
    sprite_text_moves_found.left = 16
    sprite_text_moves_found.top = 90
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(lock_chessboard)) {
        selected_piece = false
        sprite_text_moves_found.setText("")
        make_tilemap(false)
    }
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
function get_valid_spots (piece: Sprite, attack_only: boolean) {
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
        return get_valid_pawn_spot(piece, attack_only)
    }
}
function make_pieces () {
    for (let location of tiles.getTilesByType(assets.tile`white_rook_tile`)) {
        make_piece(sprites.create(assets.image`white_rook`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "rook", false)
    }
    for (let location of tiles.getTilesByType(assets.tile`white_knight_tile`)) {
        make_piece(sprites.create(assets.image`white_knight`, SpriteKind.Piece), tiles.locationXY(location, tiles.XY.column), tiles.locationXY(location, tiles.XY.row), "knight", false)
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
function create_buttons () {
    sprite_go_button = sprites.create(assets.image`go_button`, SpriteKind.Text)
    sprite_go_button.top = 55
    sprite_go_button.left = 92
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprite_cursor_pointer.overlapsWith(sprite_go_button)) {
        lock_chessboard = false
        game_started = true
        sprite_go_button.destroy()
        for (let sprite of sprites.allOfKind(SpriteKind.Text)) {
            sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
        }
    } else if (game_started) {
        if (!(lock_chessboard)) {
            if (!(selected_piece)) {
                pieces_clicked = grid.getSprites(tiles.locationOfSprite(sprite_cursor_pointer))
                if (pieces_clicked.length > 0) {
                    if (sprites.readDataBoolean(pieces_clicked[0], "color") == active_player) {
                        sprite_selected_piece = pieces_clicked[0]
                        valid_spots = get_valid_spots(sprite_selected_piece, false)
                        show_valid_spots()
                        if (sprites.readDataString(sprite_selected_piece, "type") == "king") {
                            grid.remove(sprite_selected_piece)
                            highlight_all_attacked_tiles(sprite_selected_piece, sprites.readDataBoolean(sprite_selected_piece, "color"))
                            grid.snap(sprite_selected_piece)
                            reset_attacked_tiles()
                        }
                        sprite_text_moves_found.setText("Moves found: " + number_of_valid_spots())
                        if (number_of_valid_spots() == 0) {
                            sprite_text_moves_found.image.replace(15, 2)
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
                    sprite_text_moves_found.setText("")
                    make_tilemap(false)
                }
                selected_piece = false
            }
        }
    } else {
        scene.cameraShake(4, 200)
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
function show_valid_spots () {
    for (let location of valid_spots) {
        if (within(tiles.locationXY(location, tiles.XY.row), 2, 9, true) && within(tiles.locationXY(location, tiles.XY.column), 2, 9, true)) {
            if (tiles.tileAtLocationEquals(location, assets.tile`dark_tile`)) {
                tiles.setTileAt(location, assets.tile`green_tile_on_dark`)
            } else {
                tiles.setTileAt(location, assets.tile`green_tile_on_light`)
            }
        }
    }
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
    local_valid_king_spots = []
    local_valid_spots = []
    check_location(piece, 0, -1)
    check_location(piece, 1, -1)
    check_location(piece, 1, 0)
    check_location(piece, 1, 1)
    check_location(piece, 0, 1)
    check_location(piece, -1, 1)
    check_location(piece, -1, 0)
    check_location(piece, -1, -1)
    for (let sprite of local_valid_spots) {
        local_valid_king_spots.push(sprite)
    }
    return local_valid_king_spots
}
function reset_attacked_tiles () {
    for (let location of tiles.getTilesByType(assets.tile`red_tile`)) {
        if (is_even(tiles.locationXY(location, tiles.XY.column) + tiles.locationXY(location, tiles.XY.row))) {
            tiles.setTileAt(location, assets.tile`light_tile`)
        } else {
            tiles.setTileAt(location, assets.tile`dark_tile`)
        }
    }
}
function number_of_valid_spots () {
    return tiles.getTilesByType(assets.tile`green_tile_on_dark`).length + tiles.getTilesByType(assets.tile`green_tile_on_light`).length
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
function format_time (seconds: number) {
    local_formatted_time = ""
    if (seconds >= 60) {
        local_formatted_time = "" + Math.idiv(seconds, 60) + "m "
    }
    local_formatted_time = "" + local_formatted_time + seconds % 60 + "s"
    return local_formatted_time
}
function is_even (x: number) {
    return x % 2 == 0
}
let local_formatted_time = ""
let local_valid_king_spots: tiles.Location[] = []
let sprite_cursor: Sprite = null
let pieces_clicked: Sprite[] = []
let sprite_cursor_pointer: Sprite = null
let sprite_go_button: Sprite = null
let sprite_text_moves_found: TextSprite = null
let sprite_text_player_black_time: TextSprite = null
let sprite_text_black_time_label: TextSprite = null
let sprite_text_white_player_time: TextSprite = null
let sprite_text_white_time_label: TextSprite = null
let sprite_text_current_player: TextSprite = null
let sprite_text_player_label: TextSprite = null
let local_other_piece: Sprite[] = []
let local_valid_spots: tiles.Location[] = []
let local_location: tiles.Location = null
let game_started = false
let lock_chessboard = false
let valid_spots: tiles.Location[] = []
let sprite_selected_piece: Sprite = null
let selected_piece = false
let active_player = false
active_player = false
let white_player_time = 120
let black_player_time = 120
selected_piece = false
sprite_selected_piece = null
valid_spots = []
lock_chessboard = true
game_started = false
make_cursor()
scene.setBackgroundColor(13)
make_tilemap(true)
make_pieces()
make_tilemap(false)
prepare_text()
create_buttons()
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
    sprite_text_player_black_time.setText(format_time(black_player_time))
    if (black_player_time < 30) {
        if (Math.floor(black_player_time) % 2 == 0) {
            sprite_text_player_black_time.image.replace(15, 2)
        } else {
            sprite_text_player_black_time.image.replace(15, 4)
        }
    }
    sprite_text_white_player_time.setText(format_time(white_player_time))
    if (white_player_time < 30) {
        if (Math.floor(white_player_time) % 2 == 0) {
            sprite_text_white_player_time.image.replace(15, 2)
        } else {
            sprite_text_white_player_time.image.replace(15, 4)
        }
    }
    pause(100)
})
forever(function () {
    if (game_started) {
        if (black_player_time <= 0) {
            black_player_time = 0
            lock_chessboard = true
            sprite_text_player_label.setText("White wins!")
            sprite_text_current_player.setText("")
            pause(100)
        } else if (white_player_time <= 0) {
            white_player_time = 0
            lock_chessboard = true
            sprite_text_player_label.setText("Black wins!")
            sprite_text_current_player.setText("")
            pause(100)
        } else {
            if (active_player) {
                sprite_text_current_player.setText("Black")
            } else {
                sprite_text_current_player.setText("White")
            }
            if (active_player) {
                if (black_player_time > 60) {
                    timer.throttle("black_player_time", 1000, function () {
                        black_player_time += -1
                    })
                } else {
                    timer.throttle("black_player_time", 100, function () {
                        black_player_time = spriteutils.roundWithPrecision(black_player_time - 0.1, 1)
                    })
                }
            } else {
                if (white_player_time > 60) {
                    timer.throttle("white_player_time", 1000, function () {
                        white_player_time += -1
                    })
                } else {
                    timer.throttle("white_player_time", 100, function () {
                        white_player_time = spriteutils.roundWithPrecision(white_player_time - 0.1, 1)
                    })
                }
            }
        }
    } else {
        if (active_player) {
            sprite_text_current_player.setText("Black")
        } else {
            sprite_text_current_player.setText("White")
        }
        pause(100)
    }
})
