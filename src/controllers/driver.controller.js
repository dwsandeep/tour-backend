import { Driver } from "../modals/driver.model.js";
import { City } from "../modals/city.model.js";

const createDriver = async (req, res) => {
  try {
    const { name, phone, email, licenseNumber, licenseExpiryDate, address, cityId, isActive } = req.body;

    if (!name || !phone || !licenseNumber || !licenseExpiryDate || !cityId) {
      return res.status(400).json({ message: "Name, phone, licenseNumber, licenseExpiryDate, and cityId are required" });
    }

    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    const driver = await Driver.create({
      name,
      phone,
      email,
      licenseNumber,
      licenseExpiryDate,
      address,
      cityId,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({ message: "Driver created successfully", data: driver });
  } catch (error) {
    return res.status(500).json({ message: "Error creating driver", error: error.message });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const { cityId } = req.query;
    const filter = {};

    if (cityId) {
      filter.cityId = cityId;
    }

    const drivers = await Driver.find(filter).populate("cityId").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Drivers fetched successfully", data: drivers });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching drivers", error: error.message });
  }
};

const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id).populate("cityId");

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ message: "Driver fetched successfully", data: driver });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching driver", error: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, licenseNumber, licenseExpiryDate, address, cityId, isActive } = req.body;

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    if (cityId) {
      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
    }

    driver.name = name || driver.name;
    driver.phone = phone || driver.phone;
    driver.email = email !== undefined ? email : driver.email;
    driver.licenseNumber = licenseNumber || driver.licenseNumber;
    driver.licenseExpiryDate = licenseExpiryDate || driver.licenseExpiryDate;
    driver.address = address !== undefined ? address : driver.address;
    driver.cityId = cityId !== undefined ? cityId : driver.cityId;
    driver.isActive = isActive !== undefined ? isActive : driver.isActive;

    await driver.save();

    return res.status(200).json({ message: "Driver updated successfully", data: driver });
  } catch (error) {
    return res.status(500).json({ message: "Error updating driver", error: error.message });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByIdAndDelete(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting driver", error: error.message });
  }
};

const getActiveDrivers = async (req, res) => {
  try {
    const { cityId } = req.query;
    const filter = { isActive: true };

    if (cityId) {
      filter.cityId = cityId;
    }

    const drivers = await Driver.find(filter).populate("cityId").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Active drivers fetched successfully", data: drivers });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching active drivers", error: error.message });
  }
};

export {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getActiveDrivers,
};
