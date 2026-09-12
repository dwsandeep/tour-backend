import { Service } from "../modals/service.model.js";
import { City } from "../modals/city.model.js";

const createService = async (req, res) => {
  try {
    const { name, slug, cityId, shortDescription, description, pricingType, price, image, isActive } = req.body;

    if (!name || !slug || !cityId || !pricingType || price === undefined) {
      return res.status(400).json({ message: "Name, slug, cityId, pricingType, and price are required" });
    }

    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    const existingService = await Service.findOne({ slug });
    if (existingService) {
      return res.status(400).json({ message: "Service with this slug already exists" });
    }

    const service = await Service.create({
      name,
      slug,
      cityId,
      shortDescription,
      description,
      pricingType,
      price,
      image,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({ message: "Service created successfully", data: service });
  } catch (error) {
    return res.status(500).json({ message: "Error creating service", error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const { cityId } = req.query;
    const filter = {};

    if (cityId) {
      filter.cityId = cityId;
    }

    const services = await Service.find(filter).populate("cityId").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Services fetched successfully", data: services });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate("cityId");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service fetched successfully", data: service });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching service", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, cityId, shortDescription, description, pricingType, price, image, isActive } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (cityId) {
      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
    }

    if (slug && slug !== service.slug) {
      const existingService = await Service.findOne({ slug });
      if (existingService) {
        return res.status(400).json({ message: "Service with this slug already exists" });
      }
    }

    service.name = name || service.name;
    service.slug = slug || service.slug;
    service.cityId = cityId !== undefined ? cityId : service.cityId;
    service.shortDescription = shortDescription !== undefined ? shortDescription : service.shortDescription;
    service.description = description !== undefined ? description : service.description;
    service.pricingType = pricingType || service.pricingType;
    service.price = price !== undefined ? price : service.price;
    service.image = image !== undefined ? image : service.image;
    service.isActive = isActive !== undefined ? isActive : service.isActive;

    await service.save();

    return res.status(200).json({ message: "Service updated successfully", data: service });
  } catch (error) {
    return res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};

const getActiveServices = async (req, res) => {
  try {
    const { cityId } = req.query;
    const filter = { isActive: true };

    if (cityId) {
      filter.cityId = cityId;
    }

    const services = await Service.find(filter).populate("cityId").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Active services fetched successfully", data: services });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching active services", error: error.message });
  }
};

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getActiveServices,
};
