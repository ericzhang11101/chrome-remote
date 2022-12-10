console.log("BACKGROUNDBACKGROUND")


self.onmessage = ({ data: { question } }) => {
  console.log('on message!!!!');
};

console.log(self)
onmessage({data: "random"})
console.log('after')
