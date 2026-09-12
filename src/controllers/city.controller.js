import { City } from "../modals/city.model.js";

const createCity = async (req, res) => {
  try {
    const { name, slug, state, country, isActive } = req.body;

    if (!name || !slug || !state || !country) {
      return res.status(400).json({ message: "Name, slug, state, and country are required" });
    }

    const existingCity = await City.findOne({ slug });
    if (existingCity) {
      return res.status(400).json({ message: "City with this slug already exists" });
    }

    const city = await City.create({
      name,
      slug,
      state,
      country,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({ message: "City created successfully", data: city });
  } catch (error) {
    return res.status(500).json({ message: "Error creating city", error: error.message });
  }
};

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Cities fetched successfully", data: cities });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cities", error: error.message });
  }
};

const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findById(id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    return res.status(200).json({ message: "City fetched successfully", data: city });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching city", error: error.message });
  }
};

const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, state, country, isActive } = req.body;

    const city = await City.findById(id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    if (slug && slug !== city.slug) {
      const existingCity = await City.findOne({ slug });
      if (existingCity) {
        return res.status(400).json({ message: "City with this slug already exists" });
      }
    }

    city.name = name || city.name;
    city.slug = slug || city.slug;
    city.state = state || city.state;
    city.country = country || city.country;
    city.isActive = isActive !== undefined ? isActive : city.isActive;

    await city.save();

    return res.status(200).json({ message: "City updated successfully", data: city });
  } catch (error) {
    return res.status(500).json({ message: "Error updating city", error: error.message });
  }
};

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    return res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting city", error: error.message });
  }
};

const getActiveCities = async (req, res) => {
  try {
    const cities = await City.find({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Active cities fetched successfully", data: cities });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching active cities", error: error.message });
  }
};

export {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
  getActiveCities,
};
