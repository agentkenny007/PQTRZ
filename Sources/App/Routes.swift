import Vapor
import AuthProvider

extension Droplet {
    func setupRoutes() throws {
        try setupUnauthenticatedRoutes()
        try setupPasswordProtectedRoutes()
        try setupTokenProtectedRoutes()
    }

    /// Sets up allvarutes that can be accessed
    /// without any authentication.
    private func setupUnauthenticatedRoutes() throws {
        get { _ in try self.view.make("index") }

        get("home") { _ in try self.view.make("index") }

        get("pqtrz") { req in return try Pqtr.all().makeJSON() }

        get("pqtrz", ":hash") { req in
          let hash = req.parameters["hash"]
          let pqtr = try Pqtr.makeQuery().filter("hash", hash).first()

          guard pqtr != nil else {
              throw Abort(.badRequest, reason: "404 not found.")
          }

          return pqtr!.blob
        }

        // create a new user
        //
        // POST /register
        // <json containing new user information>
        post("register") { req in
            // require that the request body be json
            guard let json = req.json else {
                throw Abort(.badRequest, reason: "No credentials.")
            }

            // initialize the name and email from
            // the request json
            let user = try User(json: json)

            // ensure no user with this username already exists
            guard try User.makeQuery().filter("username", user.username).first() == nil else {
                throw Abort(.badRequest, reason: "A user with that username already exists.")
            }

            // ensure no user with this email already exists
            guard try User.makeQuery().filter("email", user.email).first() == nil else {
                throw Abort(.badRequest, reason: "A user with that email already exists.")
            }

            // require a plaintext password is supplied
            guard let password = json["password"]?.string else {
                throw Abort(.badRequest, reason: "Missing or invalid credentials.")
            }

            // hash the password and set it on the user
            user.password = try self.hash.make(password.makeBytes()).makeString()

            // save and return the new user
            try user.save()
            return user
        }
    }

    /// Sets up all routes that can be accessed using
    /// username + password authentication.
    /// Since we want to minimize how often the username + password
    /// is sent, we will only use this form of authentication to
    /// log the user in.
    /// After the user is logged in, they will receive a token that
    /// they can use for further authentication.
    private func setupPasswordProtectedRoutes() throws {
        // creates a route group protected by the password middleware.
        // the User type can be passed to this middleware since it
        // conforms to PasswordAuthenticatable
        let password = grouped([
                PasswordAuthenticationMiddleware(User.self)
            ])

        // verifies the user has been authenticated using the password
        // middleware, then generates, saves, and returns a new access token.
        //
        // POST /login
        // Authorization: Basic <base64 username:password>
        password.post("login") { req in
            print(req.auth.header?.basic as Any)
            print(req.auth.header?.bearer as Any)

            let user = try req.user()
            let token = try Token.generate(for: user)
            try token.save()

            var json = JSON()
            try json.set("access", token)
            try json.set("user", user)
            return json
        }
    }

    /// Sets up all routes that can be accessed using
    /// the authentication token received during login.
    /// All of our secure routes will go here.
    private func setupTokenProtectedRoutes() throws {
        // creates a route group protected by the token middleware.
        // the User type can be passed to this middleware since it
        // conforms to TokenAuthenticatable
        let token = grouped([
                TokenAuthenticationMiddleware(User.self)
            ])

        // simply returns a greeting to the user that has been authed
        // using the token middleware.
        //
        // GET /me
        // Authorization: Bearer <token from /login>
        token.get("me") { req in
            let user = try req.user()
            return "Hello, \(user.username)"
        }

        try token.resource("_", PqtrController.self)
    }
}
