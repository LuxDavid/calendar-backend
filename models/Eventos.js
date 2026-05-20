import {Schema, model} from "mongoose";

const EventoSchema= Schema({
    title:{
        type:String,
        required: true
    },
     notes:{
        type:String,
        required: true,
        unique: true
    },
     start:{
        type:String,
        required: true
    },
    end:{
        type:String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EventoSchema.method('toJSON', function(){
    const {_v, _id, ...object}= this.toObject();
    object.id = _id;
    return object
});

const EventModel = model('Evento', EventoSchema);

export default EventModel

