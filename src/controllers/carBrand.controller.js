import CarBrand from "../modals/carBrand.model.js";

const createCarBrand = async (req, res) => {
  try {
    const { name, slug, isActive } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const existingCarBrand = await CarBrand.findOne({ slug });
    if (existingCarBrand) {
      return res.status(400).json({ message: "Car brand with this slug already exists" });
    }

    const carBrand = await CarBrand.create({
      name,
      slug,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({ message: "Car brand created successfully", data: carBrand });
  } catch (error) {
    return res.status(500).json({ message: "Error creating car brand", error: error.message });
  }
};

const getAllCarBrands = async (req, res) => {
  try {
    const carBrands = await CarBrand.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Car brands fetched successfully", data: carBrands });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching car brands", error: error.message });
  }
};

const getCarBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const carBrand = await CarBrand.findById(id);

    if (!carBrand) {
      return res.status(404).json({ message: "Car brand not found" });
    }

    return res.status(200).json({ message: "Car brand fetched successfully", data: carBrand });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching car brand", error: error.message });
  }
};

const updateCarBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, isActive } = req.body;

    const carBrand = await CarBrand.findById(id);
    if (!carBrand) {
      return res.status(404).json({ message: "Car brand not found" });
    }

    if (slug && slug !== carBrand.slug) {
      const existingCarBrand = await CarBrand.findOne({ slug });
      if (existingCarBrand) {
        return res.status(400).json({ message: "Car brand with this slug already exists" });
      }
    }

    carBrand.name = name || carBrand.name;
    carBrand.slug = slug || carBrand.slug;
    carBrand.isActive = isActive !== undefined ? isActive : carBrand.isActive;

    await carBrand.save();

    return res.status(200).json({ message: "Car brand updated successfully", data: carBrand });
  } catch (error) {
    return res.status(500).json({ message: "Error updating car brand", error: error.message });
  }
};

const deleteCarBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const carBrand = await CarBrand.findByIdAndDelete(id);

    if (!carBrand) {
      return res.status(404).json({ message: "Car brand not found" });
    }

    return res.status(200).json({ message: "Car brand deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting car brand", error: error.message });
  }
};

const getActiveCarBrands = async (req, res) => {
  try {
    const carBrands = await CarBrand.find({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Active car brands fetched successfully", data: carBrands });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching active car brands", error: error.message });
  }
};

export {
  createCarBrand,
  getAllCarBrands,
  getCarBrandById,
  updateCarBrand,
  deleteCarBrand,
  getActiveCarBrands,
};
