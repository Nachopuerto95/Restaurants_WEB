const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        email: {
            unique: true,
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
            }
        },
        avatar: {
            type: String,
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
        }
    }
)

// hashea la contraseña antes de guardarla

schema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next()
            })
            .catch(next)
    } else {
        next()
    }
})

// Compara el hash al hacer login
schema.method('checkPassword', function (password) {
    return bcrypt.compare(password, this.password)
})

module.exports = mongoose.model('User', schema);