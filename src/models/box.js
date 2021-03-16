import mongoose from "mongoose";
import { autoIncrement } from 'mongoose-plugin-autoinc';
// import mongooseIncrement from "mongoose-increment";

// const increment = mongooseIncrement(mongoose);

const boxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number
  },
});

// boxSchema.plugin(increment, {
//   modelName: "Box",
//   fieldName: "count",
//   unique: false,
//   start: 1,
//   increment: 1,
//   resetAfter: 10
// });

boxSchema.plugin(autoIncrement, { model: 'Box', field: 'count' ,
startAt: 1});

const Box = mongoose.model("Box", boxSchema),
book = new Box();

book.save(err => {

 book.count < 3 // -> true

book.nextCount((err1, count) => {

     count +=1 //-> true

    book.resetCount((err2, nextCount) => {

        nextCount > 3 //-> true

    });

});

});

export default Box;
