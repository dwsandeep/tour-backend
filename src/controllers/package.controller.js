import { Package } from "../modals/package.model.js";

const createPackage = async (req, res) => {
  try {
    const {
      name,
      slug,
      source,
      destination,
      tripType,
      distanceKm,
      estimatedDurationMinutes,
      shortDescription,
      description,
      image,
      pricing,
      inclusions,
      exclusions,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    if (!name || !slug || !source || !destination || !tripType || !pricing || !Array.isArray(pricing) || pricing.length === 0) {
      return res.status(400).json({ message: "Name, slug, source, destination, tripType, and pricing are required" });
    }

    const existingPackage = await Package.findOne({ slug });
    if (existingPackage) {
      return res.status(400).json({ message: "Package with this slug already exists" });
    }

    const tourPackage = await Package.create({
      name,
      slug,
      source,
      destination,
      tripType,
      distanceKm,
      estimatedDurationMinutes,
      shortDescription,
      description,
      image,
      pricing,
      inclusions,
      exclusions,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder !== undefined ? displayOrder : 0,
    });

    const populatedPackage = await Package.findById(tourPackage._id).populate("pricing.carId");

    return res.status(201).json({ message: "Package created successfully", data: populatedPackage });
  } catch (error) {
    return res.status(500).json({ message: "Error creating package", error: error.message });
  }
};

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).populate("pricing.carId").sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ message: "Packages fetched successfully", data: packages });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching packages", error: error.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const tourPackage = await Package.findById(id).populate("pricing.carId");

    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ message: "Package fetched successfully", data: tourPackage });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching package", error: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      source,
      destination,
      tripType,
      distanceKm,
      estimatedDurationMinutes,
      shortDescription,
      description,
      image,
      pricing,
      inclusions,
      exclusions,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const tourPackage = await Package.findById(id);
    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (slug && slug !== tourPackage.slug) {
      const existingPackage = await Package.findOne({ slug });
      if (existingPackage) {
        return res.status(400).json({ message: "Package with this slug already exists" });
      }
    }

    tourPackage.name = name || tourPackage.name;
    tourPackage.slug = slug || tourPackage.slug;
    tourPackage.source = source || tourPackage.source;
    tourPackage.destination = destination || tourPackage.destination;
    tourPackage.tripType = tripType || tourPackage.tripType;
    tourPackage.distanceKm = distanceKm !== undefined ? distanceKm : tourPackage.distanceKm;
    tourPackage.estimatedDurationMinutes = estimatedDurationMinutes !== undefined ? estimatedDurationMinutes : tourPackage.estimatedDurationMinutes;
    tourPackage.shortDescription = shortDescription !== undefined ? shortDescription : tourPackage.shortDescription;
    tourPackage.description = description !== undefined ? description : tourPackage.description;
    tourPackage.image = image !== undefined ? image : tourPackage.image;
    tourPackage.pricing = pricing || tourPackage.pricing;
    tourPackage.inclusions = inclusions !== undefined ? inclusions : tourPackage.inclusions;
    tourPackage.exclusions = exclusions !== undefined ? exclusions : tourPackage.exclusions;
    tourPackage.isFeatured = isFeatured !== undefined ? isFeatured : tourPackage.isFeatured;
    tourPackage.isActive = isActive !== undefined ? isActive : tourPackage.isActive;
    tourPackage.displayOrder = displayOrder !== undefined ? displayOrder : tourPackage.displayOrder;

    await tourPackage.save();

    const populatedPackage = await Package.findById(tourPackage._id).populate("pricing.carId");

    return res.status(200).json({ message: "Package updated successfully", data: populatedPackage });
  } catch (error) {
    return res.status(500).json({ message: "Error updating package", error: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const tourPackage = await Package.findByIdAndDelete(id);

    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting package", error: error.message });
  }
};

const getActivePackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).populate("pricing.carId").sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ message: "Active packages fetched successfully", data: packages });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching active packages", error: error.message });
  }
};

const getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true, isFeatured: true }).populate("pricing.carId").sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ message: "Featured packages fetched successfully", data: packages });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching featured packages", error: error.message });
  }
};

export {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getActivePackages,
  getFeaturedPackages,
};
