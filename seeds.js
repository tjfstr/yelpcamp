const mongoose   = require('mongoose');
const Campground = require('./models/campground');
const Comment    = require('./models/comment');

const data = [
    {
        name: 'Cloud\'s Rest', 
        image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
        description: 'Permanence of the stars preserve and cherish that pale blue dot with pretty stories for which there\'s little good evidence from which we spring cosmic ocean finite but unbounded. Emerged into consciousness two ghostly white figures in coveralls and helmets are softly dancing paroxysm of global death paroxysm of global death Tunguska event invent the universe? Invent the universe a mote of dust suspended in a sunbeam the carbon in our apple pies Apollonius of Perga something incredible is waiting to be known invent the universe and billions upon billions upon billions upon billions upon billions upon billions upon billions.'
    },

    {
        name: 'Desert Mesa', 
        image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
        description: 'Colonies across the centuries hundreds of thousands birth white dwarf astonishment. Euclid with pretty stories for which there\'s little good evidence emerged into consciousness Apollonius of Perga citizens of distant epochs a still more glorious dawn awaits. Sea of Tranquility how far away the sky calls to us at the edge of forever the only home we\'ve ever known paroxysm of global death. Two ghostly white figures in coveralls and helmets are softly dancing a mote of dust suspended in a sunbeam rich in heavy atoms another world another world bits of moving fluff?'
    },

    {
        name: 'Canyon Floor', 
        image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
        description: 'Billions upon billions concept of the number one with pretty stories for which there\'s little good evidence billions upon billions two ghostly white figures in coveralls and helmets are softly dancing dream of the mind\'s eye. Bits of moving fluff preserve and cherish that pale blue dot a still more glorious dawn awaits paroxysm of global death network of wormholes descended from astronomers. Shores of the cosmic ocean Apollonius of Perga with pretty stories for which there\'s little good evidence how far away courage of our questions emerged into consciousness.'

    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, (err) => {
        if(err){
            console.log(err);
        }
        console.log('removed campgrounds!');
        Comment.remove({}, (err) => {
            if(err){
                console.log(err);
            }
            console.log('removed comments!');
            //ADD A FEW CAMGROUNDS
            data.forEach(function(seed){
                Campground.create(seed, (err, campground) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log('added a campground');
                        //CREATE A COMMENT
                        Comment.create(
                            {
                                text: 'This place is great, but I wish there was internet',
                                author: 'Homer'
                            }, (err, comment) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('Created new comment');
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;