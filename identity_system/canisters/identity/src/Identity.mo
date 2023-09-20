import Array;
import Option;

type UserRecord = { username: Text, password: Text };

var users : Array<UserRecord> = [];

public shared({caller}) func registerUser(username: Text, password: Text) : async Bool {
    assert (caller == null, "Only the canister can call this function.");
    let newUser : UserRecord = { username = username; password = password };
    users := users ++ [newUser];
    return true;
}

public shared({caller}) func authenticateUser(username: Text, password: Text) : async Bool {
    assert (caller == null, "Only the canister can call this function.");
    switch (Array.find(record => record.username == username, users)) {
        case (null) {
            return false; // Usuario no encontrado
        }
        case (Some(user)) {
            return user.password == password; // Comprobar contraseña
        }
    }
}