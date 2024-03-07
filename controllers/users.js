const Model = require('../models/user')
const ProfileModel = require('../models/profile');



// @URL     GET /api/users
exports.list = async(req, res)=>{
    res.status(200).json(res.results)
}

// @URL     GET /api/users/:id
exports.read = async (req, res) => {
    const userData = await Model.findById(req.params.id);
  
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  
    // Populating the 'profile' field from the 'Profile' model
    const userProfile = await ProfileModel.findOne({ userId: userData._id });

    res.status(200).json({ success: true, data: userData, profile:userProfile });
  };

// @URL     POST /api/users
exports.create = async(req, res)=>{
    const data = await Model.create(req.body)
    res.status(201).json({success: true, data:data})
}
// @URL     PUT /api/users/:id
exports.update = async(req, res)=>{
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).json({success: true, data:data})  
}

// @URL     DELETE /api/users/:id
exports.delete = async(req, res)=>{
    const user = await Model.findById(req.params.id)
    await user.deleteOne()
    res.status(204).json({success: true, data:{}})
}