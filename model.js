const mongoose= require("mongoose");
const noteSchema={
    to_do:String
} 

const Note =mongoose.model("notes",noteSchema);
module.exports= Note;