import Vapor
import FluentProvider
import HTTP
import AuthProvider

final class User: Model {
    let storage = Storage()
    var first: String
    var last: String
    var username: String
    var email: String
    var password: String?

    init(row: Row) throws {
        first = try row.get("first")
        last = try row.get("last")
        username = try row.get("username")
        email = try row.get("email")
        password = try row.get("passward")
    }

//    init(node: Node, in context: Context) throws {
//        first = try node.extract("first")
//        last = try node.extract("last")
//        email = try node.extract("email")
//        username = try node.extract("username")
//        password = try node.extract("password")
//    }

    init(first: String, last: String, email: String, username: String, password: String? = nil) {
        self.first = first
        self.last = last
        self.username = username
        self.email = email
        self.password = password
    }

    func makeNode(context: Context) throws -> Node {
        return try Node(node: [
            "first": first,
            "last": last,
            "username": username,
            "password": password,
            "email": email ])
    }

    func makeRow() throws -> Row {
        var row = Row()
        try row.set("first", first)
        try row.set("last", last)
        try row.set("username", username)
        try row.set("email", email)
        try row.set("password", password)
        return row
    }
}

extension User: Preparation {
    static func prepare(_ database: Database) throws {
        try database.create(self) { users in
            users.id()
            users.string("first")
            users.string("last")
            users.string("username")
            users.string("email")
            users.string("password")
        }
    }

    static func revert(_ database: Database) throws {
        try database.delete(self)
    }
}

extension User: JSONConvertible {
    convenience init(json: JSON) throws {
        try self.init(
            first: json.get("first"),
            last: json.get("last"),
            email: json.get("email"),
            username: json.get("username"),
            password: json.get("password")
        )
    }

    func makeJSON() throws -> JSON {
        var json = JSON()
        try json.set("first", first)
        try json.set("last", last)
        try json.set("username", username)
        try json.set("email", email)
        try json.set("password", password)
        return json
    }
}

extension User: PasswordAuthenticatable {
    var hashedPassword: String? {
        return password
    }

   static var usernameKey: String {
       return "username"
   }

   static var passwordKey: String {
       return "password"
   }

    public static var passwordVerifier: PasswordVerifier? {
        get { return _userPasswordVerifier }
        set { _userPasswordVerifier = newValue }
    }
}

private var _userPasswordVerifier: PasswordVerifier? = nil

extension Request {
    func user() throws -> User {
        return try auth.assertAuthenticated()
    }
}

extension User: ResponseRepresentable { }

extension User: Timestampable { }

extension User: TokenAuthenticatable {
    typealias TokenType = Token
}
