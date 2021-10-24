const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    main : [String],
    middle : [String],
    sub : [String],
    difficulty : {type : String, default: undefined}
})

const DescribtionSchema = new Schema({
    previous : {type: String, default: undefined},
    question : {type: String, required: true},
    answer : {type: String, required: true},
    keypoint : {type: String, required: true}
})

const Item = new Schema({
    category: { type : CategorySchema, default: undefined},
    describtion : { type : DescribtionSchema, required: true},
    createdAt: { type: Date, default: Date.now }
});

Item.statics.findByCategory = function(params) {
    const { main, middle, sub} = params;
    let condition = new Object;
    if(main != "all"){
        condition['category.main'] = main;
    }
    if(middle != "all"){
        condition['category.middle'] = middle;
    }
    if(sub != "all"){
        condition['category.sub'] = sub;
    }
    return this.find(condition).exec();
}

Item.statics.Register = function({ category, describtion }){
    const item = new this({
        category,
        describtion
    });

    return item.save();
}

module.exports = mongoose.model('Item', Item);