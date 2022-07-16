const iDs = ['new ObjectId("61ff96e6f2d8d27d5493b9a3")']
const stocks = [{
  part: {
    brand: 'new ObjectId("61ff96e6f2d8d27d5493b9a3")'
  }
}];

// console.log(iDs.filter(id => id === stocks[0].part.brand))
stocks.forEach((stock) => {
  console.log(iDs.filter(id => id === stock.part.brand))
});
