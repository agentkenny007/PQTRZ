//
//  PqtrController.swift
//  pqtrz
//
//  Created by Ikenna on 8/17/17.
//
//

import Vapor
import HTTP

/// Here we have a controller that helps facilitate
/// RESTful interactions with our Pqtrz table
final class PqtrController: ResourceRepresentable {
    /// When users call 'GET' on '/pqtrz'
    /// it should return an index of all available pqtrz
    func index(_ req: Request) throws -> ResponseRepresentable {
        return try Pqtr.all().makeJSON()
    }

    /// When consumers call 'POST' on '/pqtrz' with valid JSON
    /// create and save the pqtr
    func create(_ req: Request) throws -> ResponseRepresentable {
        guard let userID = try req.user().id?.int else {
            throw Abort(.badRequest, reason: "No user.")
        }
        var hash = String.random(length: 4)
        while try Pqtr.makeQuery().filter("hash", hash).first() != nil {
            hash = String.random(length: 4)
        }
        let pqtr = try req.pqtr()
        pqtr.user_id = userID
        pqtr.hash = hash
        try pqtr.save()
        return pqtr
    }

    /// When the consumer calls 'GET' on a specific resource, ie:
    /// '/pqtrz/13rd88' we should show that specific pqtr
    func show(_ req: Request, pqtr: Pqtr) throws -> ResponseRepresentable {
        return pqtr
    }

    /// When the consumer calls 'DELETE' on a specific resource, ie:
    /// 'pqtrz/l2jd9' we should remove that resource from the database
    func delete(_ req: Request, pqtr: Pqtr) throws -> ResponseRepresentable {
        try pqtr.delete()
        return Response(status: .ok)
    }

    /// When the consumer calls 'DELETE' on the entire table, ie:
    /// '/pqtrz' we should remove the entire table
    func clear(_ req: Request) throws -> ResponseRepresentable {
        try Pqtr.makeQuery().delete()
        return Response(status: .ok)
    }

    /// When the user calls 'PATCH' on a specific resource, we should
    /// update that resource to the new values.
    func update(_ req: Request, pqtr: Pqtr) throws -> ResponseRepresentable {
        // See `extension Pqtr: Updateable`
        try pqtr.update(for: req)

        // Save an return the updated pqtr.
        try pqtr.save()
        return pqtr
    }

    /// When a user calls 'PUT' on a specific resource, we should replace any
    /// values that do not exist in the request with null.
    /// This is equivalent to creating a new Pqtr with the same ID.
    func replace(_ req: Request, pqtr: Pqtr) throws -> ResponseRepresentable {
        // First attempt to create a new Pqtr from the supplied JSON.
        // If any required fields are missing, this request will be denied.
        let new = try req.pqtr()

        // Update the pqtr with all of the properties from
        // the new pqtr
        pqtr.blob = new.blob
        try pqtr.save()

        // Return the updated pqtr
        return pqtr
    }

    /// When making a controller, it is pretty flexible in that it
    /// only expects closures, this is useful for advanced scenarios, but
    /// most of the time, it should look almost identical to this
    /// implementation
    func makeResource() -> Resource<Pqtr> {
        return Resource(
            index: index,
            store: create,
            show: show,
            update: update,
            replace: replace,
            destroy: delete,
            clear: clear
        )
    }
}

extension Request {
    /// Create a pqtr from the JSON body
    /// return BadRequest error if invalid
    /// or no JSON
    func pqtr() throws -> Pqtr {
        guard let json = json else { throw Abort.badRequest }
        return try Pqtr(json: json)
    }
}

/// Since PqtrController doesn't require anything to
/// be initialized we can conform it to EmptyInitializable.
///
/// This will allow it to be passed by type.
extension PqtrController: EmptyInitializable { }

extension String {
    static func random(length: Int = 20) -> String {
        let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        var randomString: String = ""
        
        for _ in 0..<length {
            let randomValue = arc4random_uniform(UInt32(base.characters.count))
            randomString += "\(base[base.index(base.startIndex, offsetBy: Int(randomValue))])"
        }
        return randomString
    }
}
