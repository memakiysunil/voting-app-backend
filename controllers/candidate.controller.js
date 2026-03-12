const Candidate = require('../models/candidate.model');
const User = require('../models/user.model');

exports.addCandidate = async (req, res, next) =>{
    try{

        const existing = await Candidate.findOne({name:req.body.name, party:req.body.party});
        if(existing){
            const error = new Error('Candidate already exists');
            error.statusCode = 400;
            return next(error);
        }

        const newCandidate = new Candidate(req.body);
        const response = await newCandidate.save();

        res.status(201).json({success: true, response});
        
    }
    catch(err){
        next(err);
    }
};

exports.updateCandidate = async(req, res, next) => {
    try{
        const response = await Candidate.findByIdAndUpdate(
            req.params.candidateID,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );

        if(!response){
            const error = new Error('Candidate not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({success:true, response});
    }
    catch(err){
        next(err);
    }
};

exports.deleteCandidate = async (req, res, next) => {
    try{
        const response = await Candidate.findByIdAndDelete(req.params.candidateID);

        if(!response){
            const error = new Error('Candidate nt found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(
            {
                success: true,
                message: 'Candidate deleted successfully',
                response
            }
        );
    }
    catch(err){
        next(err)
    }
};


exports.voteCandidate = async (req, res, next) => {
    try{
        const candidate = await Candidate.findById(req.params.candidateID);
        if(!candidate){
            const error = new Error('Candidate not found');
            error.statusCode = 404;
            return next(error);
        }

        const user = await User.findById(req.user.id);
        if(!user){
            const error = new Error('user not found');
            error.statusCode = 404;
            return next(error);
        }

        if(user.role === 'admin'){
            const error = new Error('admin is not allowed');
            error.statusCode = 403;
            return next(error);
        }

        if(user.isVoted){
            const error = new Error('You have already voted');
            error.statusCode = 400;
            return next(error);
        }

        candidate.votes.push({user: req.user.id});
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();
    }
    catch(err){
        next(err);
    }
};


exports.voteCount = async (req, res, next) => {
    try{
        const candidate = await Candidate.find().sort({voteCount: -1});

        const voteRecord = candidate.map( (c) => ({
            party: c.party,
            count: c.voteCount
        }));

        res.status(200).json({success: true, voteRecord});

    }
    catch(err){
        next(err);
    }
};

exports.getCandidate = async(req, res, next) => {
    try{
        const candidate = await Candidate.find({}, 'name party -_id');
        res.status(200).json({success: true, candidate});
    }
    catch(err){
        next(err);
    }
};