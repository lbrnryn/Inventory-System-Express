// const unit = new Unit({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'NCJ8075'
// });
//
// unit.save(function (err) {
//   if (err) return handleError(err);
//
//   const part = new Part({
//     name: 'Air Filter',
//     unit: unit._id    // assign the _id from the person
//   });
//
//   part.save(function (err) {
//     if (err) return handleError(err);
//     // that's it!
//   });
// });
const part = new Part({
  _id: new mongoose.Types.ObjectId(),
  name: 'Air Filter',
  quantity: 1,
  price: 180
});

part.save(function (err) {
  if (err) return handleError(err);
  // that's it!
});

const unit = new Unit({
  name: 'NCJ8075',
  part: part._id    // assign the _id from the part
});

unit.save(function (err) {
  if (err) return handleError(err);

});
console.log(unit.part.name) // Air Filter
console.log(unit.part.quantity) // 1
console.log(unit.part.price) // 180
