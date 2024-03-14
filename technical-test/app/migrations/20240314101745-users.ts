module.exports = {
  async up(db, client) {
    await db.createCollection('user', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "address", "email", "password"],
          properties: {
            "name": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "address": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "email": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "password": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "photos": {
              bsonType: "array",
              description: "must be an object (file list) and is required",
              items: {
                bsonType: "string",
                description: "must be a string"
              }
            },
            "creditcard": {
              bsonType: "object",
              description: "must be an object and is required",
              properties: {
                type: {
                  bsonType: "string",
                  description: "must be a string and is required"
                },
                "number": {
                  bsonType: "string",
                  description: "must be a string (last 4 characters) and is required"
                },
                "name": {
                  bsonType: "string",
                  description: "must be a string and is required"
                },
                "expired": {
                  bsonType: "string",
                  description: "must be a string and is required"
                }
              },
          }
        }
      }
      }
    })

    await db.collection('user').createIndex({ email: 1 }, { unique: true });
  },

  async down(db, client) {
    await db.collection('user').drop()
  }
};
