import Vapor
import FluentProvider
import HTTP

final class Pqtr: Model {
    static let entity = "pqtrz"
    let storage = Storage()
    var id: Identifier?
    var capt: String?
    var cat: String?
    var desc: String?
    var desc_type: String?
    var likes: Int?
    var blob: String
    var width: String
    var height: String
    var size: String
    var ghost: String?
    var ghost_link: String?
    var hash: String?
    var user_id: Int?
    var source: String
    var format: String
    var bytes: Int

    init(row: Row) throws {
        capt = try row.get("capt")
        cat = try row.get("cat")
        desc = try row.get("desc")
        desc_type = try row.get("desc_type")
        likes = try row.get("likes")
        blob = try row.get("blob")
        width = try row.get("width")
        height = try row.get("height")
        size = try row.get("size")
        ghost = try row.get("ghost")
        ghost_link = try row.get("ghost_link")
        hash = try row.get("hash")
        user_id = try row.get("user_id")
        source = try row.get("source")
        format = try row.get("format")
        bytes = try row.get("bytes")
    }

    init(
        capt: String?,
        desc: String?,
        desc_type: String?,
        blob: String,
        likes: Int?,
        cat: String?,
        width: String,
        height: String,
        size: String,
        ghost: String?,
        ghost_link: String?,
        source: String,
        format: String,
        bytes: Int
        ) {
        self.capt = capt
        self.desc = desc
        self.desc_type = desc_type
        self.likes = likes
        self.blob = blob
        self.cat = cat
        self.width = width
        self.height = height
        self.size = size
        self.ghost = ghost
        self.ghost_link = ghost_link
        self.source = source
        self.format = format
        self.bytes = bytes
    }

    func makeRow() throws -> Row {
        var row = Row()
        try row.set("capt", capt)
        try row.set("desc", desc)
        try row.set("desc_type", desc_type)
        try row.set("likes", likes)
        try row.set("blob", blob)
        try row.set("cat", cat)
        try row.set("width", width)
        try row.set("height", height)
        try row.set("size", size)
        try row.set("ghost", ghost)
        try row.set("ghost_link", ghost_link)
        try row.set("hash", hash)
        try row.set("user_id", user_id)
        try row.set("source", source)
        return row
    }
}

extension Pqtr: Preparation {
    static func prepare(_ database: Database) throws {
        try database.create(self) { pqtrz in
            pqtrz.id()
            pqtrz.string("capt", length: 80, optional: true, unique: false, default: nil)
            pqtrz.custom("desc", type: "TEXT", optional: true, unique: false, default: nil)
            pqtrz.string("desc_type", length: 10, optional: true, unique: false, default: "plain")
            pqtrz.int("likes", optional: false, unique: false, default: 0)
            pqtrz.string("cat", length: 30, optional: true, unique: true)
            pqtrz.custom("blob", type: "TEXT", optional: false, unique: false)
            pqtrz.int("width")
            pqtrz.int("height")
            pqtrz.string("size", length: 10)
            pqtrz.string("ghost", length: 80, optional: true)
            pqtrz.string("ghost_link", length: nil, optional: true, unique: false)
            pqtrz.string("hash", length: 8, optional: true, unique: true)
            pqtrz.foreignId(for: User.self)
            pqtrz.string("source")
            pqtrz.string("format", length: 7)
            pqtrz.int("bytes")
        }
    }

    static func revert(_ database: Database) throws {
        try database.delete(self)
    }
}

extension Pqtr: Timestampable { }

// MARK: JSON

// How the model converts from / to JSON.
// For example when:
//     - Creating a new Pqtr (POST /pqtrs)
//     - Fetching a pqtr (GET /pqtrz, GET /pqtrz/:id)
//
extension Pqtr: JSONConvertible {
    convenience init(json: JSON) throws {
        try self.init(
            capt: try? json.get("capt"),
            desc: try? json.get("desc"),
            desc_type: try? json.get("desc_type"),
            blob: json.get("blob"),
            likes: 0,
            cat: try? json.get("cat"),
            width: json.get("width"),
            height: json.get("height"),
            size: json.get("size"),
            ghost: try? json.get("ghost"),
            ghost_link: try? json.get("ghost_link"),
            source: json.get("source"),
            format: json.get("format"),
            bytes: json.get("bytes")
        )
    }

    func makeJSON() throws -> JSON {
        var json = JSON()
        try json.set("id", id?.int)
        try json.set("capt", capt)
        try json.set("desc", desc)
        try json.set("desc_type", desc_type)
        try json.set("blob", blob)
        try json.set("likes", likes)
        try json.set("cat", cat)
        try json.set("width", width)
        try json.set("height", height)
        try json.set("size", size)
        try json.set("ghost", ghost)
        try json.set("ghost_link", ghost_link)
        try json.set("hash", hash)
        return json
    }
}

// MARK: HTTP

// This allows Pqtr models to be returned
// directly in route closures
extension Pqtr: ResponseRepresentable { }

// MARK: Update

// This allows the Pqtr model to be updated
// dynamically by the request.
extension Pqtr: Updateable {
    // Updateable keys are called when `pqtr.update(for: req)` is called.
    // Add as many updateable keys as you like here.
    public static var updateableKeys: [UpdateableKey<Pqtr>] {
        return [
            // If the request contains a String at key "content"
            // the setter callback will be called.
            UpdateableKey("capt", String.self) { pqtr, capt in pqtr.capt = capt },
            UpdateableKey("cat", String.self) { pqtr, cat in pqtr.cat = cat },
            UpdateableKey("desc", String.self) { pqtr, desc in pqtr.desc = desc },
            UpdateableKey("desc_type", String.self) { pqtr, desc_type in pqtr.desc_type = desc_type },
            UpdateableKey("likes", Int.self) { pqtr, likes in pqtr.likes = likes },
//            UpdateableKey("blob", String.self) { pqtr, blob in pqtr.blob = blob },
            UpdateableKey("width", String.self) { pqtr, width in pqtr.width = width },
            UpdateableKey("height", String.self) { pqtr, height in pqtr.height = height },
            UpdateableKey("size", String.self) { pqtr, size in pqtr.size = size },
            UpdateableKey("ghost", String.self) { pqtr, ghost in pqtr.ghost = ghost },
            UpdateableKey("ghost_link", String.self) { pqtr, ghost_link in pqtr.ghost_link = ghost_link },
        ]
    }
}

extension Pqtr: SoftDeletable { }
