const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    console.log(newRestaurant);
    
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.log("Error in Create Restaurant API", error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
    });
  }
};

const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants) {
            return res.status(404).send({
                success: false,
                message: "No restaurants found",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log("Error in Get All Restaurants API", error);
        return res.status(500).send({
            success: false,
            message: "Error in Get All Restaurants API",
        });
    }
};

const getRestaurantByIdController = async (req, res) => {   
    try {
        const restaurantId = req.params.id;
        if(!restaurantId) {
            return res.status(400).send({
                success: false,
                message: "Please provide Restaurant ID",
            });
        }
        const restaurant = await restaurantModel.findById(restaurantId);
        // check if restaurant exists
        if(!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            });
        }
        res.status(200).send({
            success: true,
            restaurant
        });
    } catch (error) {
        send.status(500).send({
            success: false,
            message: "Error in Get Restaurant By ID API",
        })
    }
};

module.exports = {
    createRestaurantController, getAllRestaurantsController, getRestaurantByIdController
};