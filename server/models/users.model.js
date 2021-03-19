module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            password: String,
            id: integer,
            email: String,
            contact: String 
        },
        {timestamps: true}
    );
    schema.method("toJSON", function() {
        const{ __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })
    const user = mongoose.model("User", schema)
    return user
};