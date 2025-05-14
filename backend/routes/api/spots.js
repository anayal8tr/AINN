const express = require('express');
const { Op } = require('sequelize');
// Security Imports
const { setTokenCookie, restoreUser } = require('../../utils/auth');
//Utilities
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// Sequelize Imports 
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage, ReviewImage, Booking } = require('../../db/models');
const { ErrorHandler, noResourceError } = require('../../utils/errorHandler');
const router = express.Router();

//PROTECT INCOMING DATA FOR THE Create Spots ROUTE
// const checkQueryParams = [
//     check("page")
//         .isInt({min:1})
//         .withMessage('Page must ne greater than or equal to 1'),
//     check("size")
//         .isInt({min:1})
//         .withMessage("Size must by greater then 1"),
//     check("maxLat")
//         .isDecimal({max:90})
//         .withMessage("Maximum latitude is invalid"),
//     check("minLat")
//         .isDecimal({min:-90})
//         .withMessage("Minimum latitude is invalid"),
//     check("maxLng")
//         .isDecimal({max:180})
//         .withMessage("Maximum longitude is invalid"),
//     check("minLng")
//         .isDecimal({min:-180})
//         .withMessage("Minimum latitude is invalid"),
//     check("minPrice")
//         .isDecimal({min:0})
//         .withMessage("Minimum price must be greater than or equal to 0"),
//     check("maxPrice")
//         .isDecimal({min:0})
//         .withMessage("Maximum price must be greater than or equal to 0"),
//     handleValidationErrors


// ];
const validateReview = [
    check("review")
        .exists({checkFalsy: true})
        .withMessage('Review text is required'),
    check("stars")
        .exists({checkFalsy: true})
        .isInt({min:1,max:5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
const validateSpots = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Street address is required'),
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage('Street address must be less than 100 characters'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('City is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('City must be less than 30 characters'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('State is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('State must be less than 30 characters'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Country is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('Country must be less than 30 characters'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ max: 256 })
        .withMessage('Description must be less than 256 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({ min: 0.01 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];


// Done
router.get('/', requireAuth, async (req, res, next) => {
    try {
        let {page,size,maxLat,minLat,minLng,maxLng,minPrice,maxPrice} = req.query;
        if(!page) page = 1;
        if(!size) size = 25;
    
        const paginationObj = {
            limit: parseInt(size),
            offset: parseInt(size) * (parseInt(page) - 1)
        }
        
        if(maxLat === undefined) maxLat = 90;
        if(minLat === undefined) minLat = -90;
        if(minLng === undefined) minLng = -180;
        if(maxLng === undefined) maxLng = 180;
        if(minPrice === undefined) minPrice = 0;
        if(maxPrice === undefined) maxPrice = 100000000;

        const spots = await Spot.findAll({ 
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
            where:{
                lat: {
                    [Op.gte]: parseFloat(minLat),
                    [Op.lte]: parseFloat(maxLat)
                },
                lng: {
                    [Op.gte]: parseFloat(minLng),
                    [Op.lte]: parseFloat(maxLng)
                },
                price: {
                    [Op.gte]: parseFloat(minPrice),
                    [Op.lte]: parseFloat(maxPrice)
                }
            },
            include: [{
                model: SpotImage,
                attributes: ['url', 'preview']
            }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }],
            ...paginationObj
        });

        const resArr = [];
        for (let spot of spots) {
            const spotBody = spot.toJSON();
            const reviews = await Review.findAll({ 
                where: { spotId: spotBody.id }
            });
            
            let aveReview = 0;
            if (reviews.length > 0) {
                aveReview = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
            }
            
            spotBody.avgRating = parseFloat(aveReview.toFixed(1));
            spotBody.numReviews = reviews.length;

            if (spotBody.SpotImages && spotBody.SpotImages.length > 0) {
                const previewImage = spotBody.SpotImages.find(img => img.preview) || spotBody.SpotImages[0];
                spotBody.previewImage = previewImage.url;
            } else {
                spotBody.previewImage = null;
            }
            
            delete spotBody.SpotImages;

            resArr.push(spotBody);
        }

        return res.json({
            Spots: resArr,
            page: parseInt(page),
            size: parseInt(size)
        });
    } catch (error) {
        console.error('Error in GET /spots:', error);
        next(error);
    }
});

//Done
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        if (!req.user) {
            const error = new Error("Authentication required");
            error.status = 401;
            throw error;
        }
        
        const currentUser = req.user.id;
        const userSpots = await Spot.findAll({
            where: { ownerId: currentUser },
            include: [{
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }]
        });
        
        if (!userSpots || userSpots.length === 0) {
            return res.json({ Spots: [] });
        }

        let resArr = [];
        for (let spot of userSpots) {
            const spotBody = spot.toJSON();
            const reviews = await Review.findAll({
                where: { spotId: spotBody.id }
            });
            
            let aveRating = 0;
            if (reviews.length > 0) {
                aveRating = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
            }
            
            spotBody.avgRating = parseFloat(aveRating.toFixed(1));
            
            if (spotBody.SpotImages && spotBody.SpotImages.length > 0) {
                const previewImage = spotBody.SpotImages.find(img => img.preview) || spotBody.SpotImages[0];
                spotBody.previewImage = previewImage.url;
            } else {
                spotBody.previewImage = null;
            }
            
            delete spotBody.SpotImages;
            resArr.push(spotBody);
        }

        return res.json({ Spots: resArr });
    } catch (error) {
        next(error);
    }
});

// Done
router.get('/:spotId', requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId);
        if (isNaN(spotId)) {
            const error = new Error("Invalid spot ID");
            error.status = 400;
            throw error;
        }

        const spot = await Spot.findByPk(spotId, {
            include: [
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        const reviews = await Review.findAll({
            where: { spotId: spot.id }
        });

        const spotData = spot.toJSON();
        
        // Calculate average rating
        let avgRating = 0;
        if (reviews.length > 0) {
            avgRating = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
        }
        spotData.avgRating = parseFloat(avgRating.toFixed(1));
        spotData.numReviews = reviews.length;

        // Handle images
        if (spotData.SpotImages && spotData.SpotImages.length > 0) {
            const previewImage = spotData.SpotImages.find(img => img.preview) || spotData.SpotImages[0];
            spotData.previewImage = previewImage.url;
            spotData.images = spotData.SpotImages.map(img => ({
                id: img.id,
                url: img.url,
                preview: img.preview
            }));
        } else {
            spotData.previewImage = null;
            spotData.images = [];
        }

        delete spotData.SpotImages;

        return res.json(spotData);
    } catch (error) {
        next(error);
    }
});


// Done
router.get('/:spotId/reviews',requireAuth, async (req, res, next) => {
    try {
        const spotId = req.params.spotId;

        if (!spotId) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }
        const reviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            include: [
                { model: User,
                    attributes:{exclude:['username','hashedPassword','email','createdAt','updatedAt']}
                },
                { model: ReviewImage,
                    attributes:{exclude:['reviewId','createdAt','updatedAt']}
                }
            ]
        });

        let updatedReviews = [];
        for (let review of reviews) {
            const updatedReview = review.toJSON();
           if(!updatedReview.ReviewImage){
            delete updatedReview.ReviewImage;
           }
            updatedReviews.push(updatedReview);
        }

        return res.json({ Reviews: updatedReviews });
    } catch (error) {
        next(error);
    }
})

// DONE
router.get('/:spotId/bookings',requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId);
        const spot = await Spot.findByPk(spotId);
        
        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        // If user is logged in
        if (req.user) {
            const bookings = await Booking.findAll({
                where: { spotId },
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }]
            });
            
            return res.json({ Bookings: bookings });
        } else {
            // For non-logged in users, return limited booking info
            const bookings = await Booking.findAll({
                where: { spotId },
                attributes: ['startDate', 'endDate']
            });
            
            return res.json({ Bookings: bookings });
        }
    } catch (error) {
        next(error);
    }
});

// Done
router.post('/', validateSpots, requireAuth, async (req, res, next) => {
    try {
        if(!req.user.id){
            const error = new Error("User needs to be signed in");
            error.status = 400;
            throw error;
        }
        const ownerId = await req.user.id;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const newSpot = await Spot.create({
            ownerId, address, city, state, country, lat, lng, name,
            description, price
        });

        const spotWithNoOwnerId = newSpot.toJSON();
        delete spotWithNoOwnerId.ownerId;

        return res.status(201).json(spotWithNoOwnerId);
    } catch (error) {
        next(error);
    }
});
// done
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    try {
        const routeId = req.params.spotId;
        const { url, preview } = req.body;

        if(!routeId){
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        const newImage = await SpotImage.create({ spotId: routeId, url, preview });

        return res.json(newImage);
    } catch (error) {
        next(error);
    }
});
// done
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId);
        const userId = req.user.id;
        const { review, stars } = req.body;

        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        const existingReview = await Review.findOne({
            where: {
                userId: userId,
                spotId: spotId
            }
        });

        if (existingReview) {
            const error = new Error("User already has a review for this spot");
            error.status = 403;
            throw error;
        }

        const newReview = await Review.create({ 
            userId, 
            spotId, 
            review, 
            stars 
        });

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});
// NEEDS REDO
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId);
        const userId = req.user.id;
        const { startDate, endDate } = req.body;

        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        if (start < now) {
            const error = new Error("Start date cannot be in the past");
            error.status = 400;
            throw error;
        }

        if (end <= start) {
            const error = new Error("End date must be after start date");
            error.status = 400;
            throw error;
        }

        // Check if spot exists
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        // Check if user owns the spot
        if (spot.ownerId === userId) {
            const error = new Error("Cannot book your own spot");
            error.status = 403;
            throw error;
        }

        // Check for booking conflicts
        const conflictingBooking = await Booking.findOne({
            where: {
                spotId,
                [Op.or]: [
                    {
                        startDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        endDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                ]
            }
        });

        if (conflictingBooking) {
            const error = new Error("Sorry, this spot is already booked for the specified dates");
            error.status = 403;
            throw error;
        }

        const newBooking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        });

        return res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});

// DONE
router.put('/:spotId', validateSpots, requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId);
        const userId = req.user.id;

        if (!req.user) {
            const error = new Error("Authentication required");
            error.status = 401;
            throw error;
        }

        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        if (spot.ownerId !== userId) {
            const error = new Error("Forbidden");
            error.status = 403;
            throw error;
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        return res.json(spot);
    } catch (error) {
        next(error);
    }
});

//DONE
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    try {
        const spotId = req.params.spotId;
        const ownerId = req.user.id;

        const spotToDelete = await Spot.findByPk(spotId);

        if (!spotToDelete) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }

        if (spotToDelete.ownerId !== ownerId) {
            const error = new Error("You are not authorized to delete this spot");
            error.status = 403;
            throw error;
        }

        await spotToDelete.destroy();
        return res.json({ message: "Spot successfully deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
