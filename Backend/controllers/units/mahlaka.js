const Mahlaka = require("../../models/units/mahlaka");

exports.findById = async(req, res) => {
  const mahlaka = await Mahlaka.findOne().where({_id:req.params.id})
  
  if(!mahlaka){
      res.status(500).json({success: false})
  }
  res.send(mahlaka)
  
 }


exports.find = (req, res) => {
    Mahlaka.find().sort({index: 1})
    .then((mahlaka) => res.json(mahlaka))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const mahlaka = new Mahlaka(req.body);
  mahlaka.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  const mahlaka = new Mahlaka(req.body);
  Mahlaka.updateOne(mahlaka)
    .then((mahlaka) => res.json(mahlaka))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
    Mahlaka.deleteOne({ _id: req.params.id })
    .then((mahlaka) => res.json(mahlaka))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findmahlakabyid = (req, res) => {
  Mahlaka.find({_id: req.body})
  .then(job => res.json(job))
  .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateploga = (req, res) => {
  Mahlaka.updateOne({_id: req.body[0]},{ploga:req.body[1]})
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json('Error: ' + err));;
 // console.log(req.body);
}


exports.mahlakabyplogaid = (req, res) => {
  Mahlaka.find({ploga: req.body.ploga}).sort({index: 1})
  .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));;
    // console.log(req.body);
  }
  // exports.updatekshirot = (req, res) => {
  //   Gdod.updateOne({_id: req.body[0]},{kshirot:req.body[1]})
  //   .then(orders => res.json(orders))
  //   .catch(err => res.status(400).json('Error: ' + err));;
  //  // console.log(req.body);
  // }
  
  // exports.updatehistory = (req, res) => {
  //   Gdod.updateOne({_id: req.body[0]}, { $push: { history: req.body[1] } })
  //   .then(orders => res.json(orders))
  //   .catch(err => res.status(400).json('Error: ' + err));;
  //  // console.log(req.body);
  // }
  
  // exports.updatetraining = (req, res) => {
  //   Gdod.updateOne({_id: req.body[0]},{training:req.body[1]})
  //   .then(orders => res.json(orders))
  //   .catch(err => res.status(400).json('Error: ' + err));;
  //  // console.log(req.body);
  // }
  
  // exports.updatetraininghistory = (req, res) => {
  //   Gdod.updateOne({_id: req.body[0]}, { $push: { traininghistory: req.body[1] } })
  //   .then(orders => res.json(orders))
  //   .catch(err => res.status(400).json('Error: ' + err));;
  //  // console.log(req.body);
  // }
  
  // exports.updateallhistoryarray = (req, res) => {
  //   Gdod.updateOne({ _id: req.body[0] }, { history: req.body[1] })
  //     .then(orders => res.json(orders))
  //     .catch(err => res.status(400).json('Error: ' + err));;
  //   // console.log(req.body);
  // }
  
  // exports.updatealltraininghistoryarray = (req, res) => {
  //   Gdod.updateOne({ _id: req.body[0] }, { traininghistory: req.body[1] })
  //     .then(orders => res.json(orders))
  //     .catch(err => res.status(400).json('Error: ' + err));;
  //   // console.log(req.body);
  // }