const Ploga = require("../../models/units/ploga");

exports.findById = async(req, res) => {
  const ploga = await Ploga.findOne().where({_id:req.params.id})
  
  if(!ploga){
      res.status(500).json({success: false})
  }
  res.send(ploga)
  
 }


exports.find = (req, res) => {
    Ploga.find().sort({index: 1})
    .then((ploga) => res.json(ploga))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const ploga = new Ploga(req.body);
  ploga.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  const ploga = new Ploga(req.body);
  Ploga.updateOne(ploga)
    .then((ploga) => res.json(ploga))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
    Ploga.deleteOne({ _id: req.params.id })
    .then((ploga) => res.json(ploga))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findplogabyid = (req, res) => {
  Ploga.find({_id: req.body})
  .then(job => res.json(job))
  .catch(err => res.status(400).json('Error: ' + err));
}

exports.updategdod = (req, res) => {
  Ploga.updateOne({_id: req.body[0]},{gdod:req.body[1]})
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json('Error: ' + err));;
 // console.log(req.body);
}


exports.plogabygdodid = (req, res) => {
  Ploga.find({gdod: req.body.gdod}).sort({index: 1})
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