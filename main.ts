namespace SpriteKind {
    export const Piece = SpriteKind.create()
}
function get_valid_spots (piece: Sprite) {
    return get_valid_rook_spot(piece)
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
            selected_piece = true
        }
    } else {
        if (sprite_cursor_pointer.tileKindAt(TileDirection.Center, assets.tile`dark_tile`) || sprite_cursor_pointer.tileKindAt(TileDirection.Center, assets.tile`light_tile`)) {
        	
        } else {
            scene.cameraShake(4, 200)
        }
        selected_piece = false
    }
})
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
function get_valid_rook_spot (piece: Sprite) {
    local_valid_spots = []
    return local_valid_spots
}
function make_piece (sprite: Sprite, col: number, row: number, _type: string, color: boolean) {
    grid.place(sprite, tiles.getTileLocation(col, row))
    sprites.setDataString(sprite, "type", _type)
    sprites.setDataBoolean(sprite, "color", color)
}
let local_valid_spots: number[] = []
let sprite_cursor: Sprite = null
let sprite_cursor_pointer: Sprite = null
let pieces_clicked: Sprite[] = []
let valid_spots: number[] = []
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
game.onUpdate(function () {
    sprite_cursor.top = sprite_cursor_pointer.top
    sprite_cursor.left = sprite_cursor_pointer.left
    if (selected_piece) {
        sprite_cursor.image.replace(1, 9)
    } else {
        sprite_cursor.image.replace(9, 1)
    }
})
