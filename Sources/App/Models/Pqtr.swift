import Vapor
import FluentProvider
import HTTP

final class Pqtr: Model {
    static let entity = "pqtrz"
    let storage = Storage()
    let capt: String
    let desc: String
    let likes: Int
    let url: String
    
    init(row: Row) throws {
        capt = try row.get("capt")
        desc = try row.get("desc")
        likes = try row.get("likes")
        url = try row.get("url")
    }
    
//    init(node: Node, in context: Context) throws {
//        capt = try node.extract("capt")
//        desc = try node.extract("desc")
//        url = try node.extract("url")
//        likes = try node.extract("likes")
//    }

    init(capt: String, desc: String, url: String, likes: Int) {
        self.capt = capt
        self.desc = desc
        self.likes = likes
        self.url = url
    }
    
    func makeNode(context: Context) throws -> Node {
        return try Node(node: [
            "capt": capt,
            "desc": desc,
            "likes": likes,
            "url": url ])
    }
    
    func makeRow() throws -> Row {
        var row = Row()
        try row.set("capt", capt)
        try row.set("desc", desc)
        try row.set("likes", likes)
        try row.set("url", url)
        return row
    }
}

extension Pqtr: Preparation {
    static func prepare(_ database: Database) throws {
        try database.create(self) { pqtrz in
            pqtrz.id()
            pqtrz.string("capt")
            pqtrz.string("desc")
            pqtrz.int("likes")
            pqtrz.string("url") }
    }

    static func revert(_ database: Database) throws {
        try database.delete(self)
    }
}

extension Pqtr: Timestampable { }
