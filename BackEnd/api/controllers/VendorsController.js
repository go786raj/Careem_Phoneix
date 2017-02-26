/**
 * VendorsController
 *
 * @description :: Server-side logic for managing vendors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    'new': function(req, res) {
        res.view();
    },

    create: function(req, res) {

        var paramObj = {


            vendorName: req.param('vendorName'),

            contract: req.param('contract'),

            Location: req.param('Location'),

            Domain: req.param('Domain')

        }

        console.log("The userid from Vendors: " + req.session.userid);

        // Create a User with the params sent from
        // the sign-up form --> new.ejs








        Vendors.create(paramObj, function VendorsCreated(err, Vendors) {

            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/Vendors/new');
            }

            res.json(Vendors);
            // res.redirect('/Vendors/show/' + Vendors.id);

        });
    },

    show: function(req, res, next) {
        Vendors.findOne(req.param('id'), function foundVendors(err, Vendors) {
            if (err) return next(err);
            if (!Vendors) return next();

            res.json(Vendors);

        });
    },

    index: function(req, res, next) {
        Vendors.find(function foundVendorss(err, Vendorss) {
            if (err) return next(err);
            res.json(Vendorss);
            //   res.view({
            //     Vendorss: Vendorss
            //   });
        });
    },

    edit: function(req, res, next) {

        Vendors.findOne(req.param('id'), function foundVendors(err, Vendors) {
            if (err) return next(err);
            if (!Vendors) return next('Vendors doesn\'t exist.');

            res.json(Vendors);
            // res.view({
            //     Vendors: Vendors
            // });
        });
    },

    update: function(req, res, next) {

        var paramObj = {

            vendorName: req.param('name'),

            contract: req.param('contract'),

            Location: req.param('Location'),

            Domain: req.param('Domain')

        }

        Vendors.update(req.param('id'), paramObj, function VendorsUpdated(err) {
            if (err) {
                console.log(err);

                req.session.flash = {
                    err: err
                }

                return res.redirect('/Vendors/edit/' + req.param('id'));
            }
            res.json(Vendors);
            //   res.redirect('/Vendors/show/' + req.param('id'));
        });
    },

    destroy: function(req, res, next) {

        //    console.log("req.param('id')" + req.param('data'));
        //  console.log("req.param('id')" + req.param('id'));

        // Vendors.findOne(req.param('id'), function foundVendors(err, Vendors) {
        //     if (err) return next(err);

        //     if (!Vendors) {
        //         res.redirect('/Vendors');
        //         return next('Vendors doesn\'t exist.');
        //     }

        //     Vendors.destroy(req.param('id'), function VendorsDestroyed(err) {
        //         if (err) return next(err);
        //     });
        //     res: 'done'
        // });



        Vendors.destroy({ id: req.param('id') }).exec(function(err) {
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Any users named Finn have now been deleted, if there were any.');
            return res.ok();
        });




    },



};