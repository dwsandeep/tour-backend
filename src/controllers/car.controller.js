import { Car } from "../modals/car.model.js";
import { Driver } from "../modals/driver.model.js";
import { City } from "../modals/city.model.js";

const createCar = async (req, res) => {
  try {
    const { name, slug, category, cityId, driverId, seatingCapacity, image, description, isActive } = req.body;

    if (!name || !slug || !cityId || !seatingCapacity) {
      return res.status(400).json({ message: "Name, slug, cityId, and seatingCapacity are required" });
    }

    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    if (driverId) {
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
    }

    const existingCar = await Car.findOne({ slug });
    if (existingCar) {
      return res.status(400).json({ message: "Car with this slug already exists" });
    }

    const car = await Car.create({
      name,
      slug,
      category,
      cityId,
      driverId,
      seatingCapacity,
      image,
      description,
      isActive: isActive !== undefined ? isActive : true,
    });

    const populatedCar = await Car.findById(car._id).populate("driverId").populate("cityId");
    return res.status(201).json({ message: "Car created successfully", data: populatedCar });
  } catch (error) {
    return res.status(500).json({ message: "Error creating car", error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const { cityId } = req.query;
    const filter = {};

    if (cityId) {
      filter.cityId = cityId;
    }

    const cars = await Car.find(filter).populate("driverId").populate("cityId").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Cars fetched successfully", data: cars });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cars", error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id).populate("driverId").populate("cityId");

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car fetched successfully", data: car });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching car", error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, category, cityId, driverId, seatingCapacity, image, description, isActive } = req.body;

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (cityId) {
      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
    }

    if (driverId) {
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
    }

    if (slug && slug !== car.slug) {
      const existingCar = await Car.findOne({ slug });
      if (existingCar) {
        return res.status(400).json({ message: "Car with this slug already exists" });
      }
    }

    car.name = name || car.name;
    car.slug = slug || car.slug;
    car.category = category !== undefined ? category : car.category;
    car.cityId = cityId !== undefined ? cityId : car.cityId;
    car.driverId = driverId !== undefined ? driverId : car.driverId;
    car.seatingCapacity = seatingCapacity !== undefined ? seatingCapacity : car.seatingCapacity;
    car.image = image !== undefined ? image : car.image;
    car.description = description !== undefined ? description : car.description;
    car.isActive = isActive !== undefined ? isActive : car.isActive;

    await car.save();

    const populatedCar = await Car.findById(car._id).populate("driverId").populate("cityId");
    return res.status(200).json({ message: "Car updated successfully", data: populatedCar });
  } catch (error) {
    return res.status(500).json({ message: "Error updating car", error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting car", error: error.message });
  }
};

const getActiveCars = async (req, res) => {
  try {
    const { cityId } = req.query;
    const filter = { isActive: true };

    if (cityId) {
      filter.cityId = cityId;
    }

    const cars = await Car.find(filter).populate("driverId").populate("cityId").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Active cars fetched successfully", data: cars });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching active cars", error: error.message });
  }
};

export {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getActiveCars,
};
