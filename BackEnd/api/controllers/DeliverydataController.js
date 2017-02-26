/**
 * DeliverydataController
 * Deliverydata/fetch
 * @description :: Server-side logic for managing deliverydatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    fetch: function(req, res, next) {

        Deliverydata.find({ date: req.param('date') }).exec(function(err, datas) {
            if (err) {
                return res.serverError(err);
            }
            sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
            return res.json(datas);
        });
    }

};