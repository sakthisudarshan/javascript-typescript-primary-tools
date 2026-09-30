/**
 * User Entity Model for Backend Data Persistence.
 */

class UserModel {
    constructor(id, username, email, role = 'user') {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    updateEmail(newEmail) {
        this.email = newEmail;
        this.updatedAt = new Date();
    }

    setRole(newRole) {
        this.role = newRole;
        this.updatedAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }
}

module.exports = UserModel;
