const Comparison = require('../../models/comparison');
const async = require("async");

const History = require('../../models/history');

exports.get = (req, res, next) => {
    const projectId = req.body.projectId;
    Comparison.find({projectId:projectId})
        .then((items) => {
            res.json(items);
        })
        .catch(err => res.status(400).json('Error: ' + err));
}
 
//API POST

exports.modifiedElement=(req,res,next)=>{
    const projectId = req.body.projectId;
    const v = req.body.version;
    async.mapSeries(req.body.data, function iterator(item, cb) {
 
        const author = item.author;
        const content = item.comment;

        const guid = item.guid;
        const typeId = item.typeId;
        const solidVolume = item.solidVolume;
        const location = item.location;
        const boundingBox = item.boundingBox;
        const centroidElement = item.centroidElement;

        let setObjComparison = {
            'data.$.v': v,
            'data.$.typeId': typeId,
            'data.$.solidVolume': solidVolume,
            'data.$.location': location,
            'data.$.boundingBox': boundingBox,
            'data.$.centroidElement': centroidElement
        } 

        let updateHistory = {
            $push: {
                modifications: {
                    v: v,
                    author: author,
                    comment: content
                }
            }
        };

        History.findOneAndUpdate({
                projectId: projectId,
                guid: guid
            }, updateHistory,
            function (error) {
                console.log('modifications history updated')
            });

        Comparison
        .findOneAndUpdate({  projectId: projectId,  guid: guid, 'data.v': v }
                            ,{ $set: setObjComparison },
                             { new: true },  (data, error) => {
                             cb(data, error);
        }); 

    },
    function done(error, datas) {
         
        res.json(error ? {
            message: +error
        } : datas);
    });
}


exports.newElement=(req,res,next)=>{
    const projectId = req.body.projectId;
    const v = req.body.version;

    async.mapSeries(req.body.data, function iterator(item, cb) {
  
        const author = item.author;
        const content = item.comment;

        const guid = item.guid;
        const typeId = item.typeId;
        const solidVolume = item.solidVolume;
        const location = item.location;
        const boundingBox = item.boundingBox;
        const centroidElement = item.centroidElement; 
    
        new History({
                projectId: projectId,
                guid: guid,
                modifications: [{
                    v: v,
                    author: author,
                    comment: content
                }]
            })
            .save().then(console.log("new history created"));

        new Comparison({
                projectId: projectId,
                guid: guid,
                data: [{
                    v: v,
                    typeId: typeId,
                    solidVolume: solidVolume,
                    location: location,
                    boundingBox: boundingBox,
                    centroidElement: centroidElement
                }]
            }, true)
            .save((error, comparison) => {

                cb(error, comparison);
            }); 
        },
        function done(error, datas) {  
            res.json(error ? {  message: +error } : datas);
        });
}
exports.deletedElement=(req,res,next)=>{
    const projectId = req.body.projectId;

    async.mapSeries(req.body.data, function iterator(item, cb) { 

        const guid = item.guid; 

        Comparison.findOneAndRemove({
                projectId: projectId,
                guid: guid
            },
            function (data, error) {
                cb(data, error);
            });

        History.findOneAndRemove({
                projectId: projectId,
                guid: guid })
                .then(console.log('history deleted'));
         


    },
    function done(error, datas) {
         
        res.json(error ? {
            message: +error
        } : 'delete elements succeeded');
    });
}


/*
exports.post = (req, res, next) => {
    const projectId = req.body.projectId;
    const v = req.body.version;

    async.mapSeries(req.body.data, function iterator(item, cb) {

            const status = item.status;
            const auteur = item.auteur;
            const content = item.comment;

            const guid = item.guid;
            const typeId = item.typeId;
            const solidVolume = item.solidVolume;
            const location = item.location;
            const boundingBox = item.boundingBox;
            const centroidElement = item.centroidElement;

            let object = {
                'data.$.v': v,
                'data.$.typeId': typeId,
                'data.$.solidVolume': solidVolume,
                'data.$.location': location,
                'data.$.boundingBox': boundingBox,
                'data.$.centroidElement': centroidElement
            }

            switch (status) {

                case 'modified':

                    let update = {
                        $push: {
                            modifications: {
                                v: v,
                                auteur: auteur,
                                comment: content
                            }
                        }
                    };

                    History.findOneAndUpdate({
                            projectId: projectId,
                            guid: guid
                        }, update,
                        function (error) {
                            console.log('modifications history updated')
                        });

                    Comparison.findOneAndUpdate({
                            projectId: projectId,
                            guid: guid,
                            'data.v': v
                        }, {
                            $set: object
                        }, {
                            new: true
                        },
                        (data, error) => {
                            cb(data, error);
                        });

                    break;
                case 'new':
                    new History({
                            projectId: projectId,
                            guid: guid,
                            modifications: [{
                                v: v,
                                auteur: auteur,
                                comment: content
                            }]
                        })
                        .save().then(console.log("new history created"));

                    new Comparison({
                            projectId: projectId,
                            guid: guid,
                            data: [{
                                v: v,
                                typeId: typeId,
                                solidVolume: solidVolume,
                                location: location,
                                boundingBox: boundingBox,
                                centroidElement: centroidElement
                            }]
                        }, true)
                        .save((error, comparison) => {

                            cb(error, comparison);
                        });

                    break;
                case 'deleted':
                    try {
                        History.findOneAndRemove({
                                projectId: projectId,
                                guid: guid
                            })
                            .then(console.log('history deleted'));

                        Comparison.findOneAndRemove({
                                projectId: projectId,
                                guid: guid
                            },
                            function (data, error) {
                                cb(data, error);
                            });
                    } catch {}

                    break;
            }


        },
        function done(error, datas) {
            console.log(datas);
            res.json(error ? {
                message: +error
            } : datas);
        });
}
*/