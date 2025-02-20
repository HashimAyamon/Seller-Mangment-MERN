const Seller = require('../models/Seller');


const getSellers = async (req, res, next) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        next(error);
    }
};


const addSeller = async (req, res, next) => {
    try {
        const { account_name, branch, amount, description, date } = req.body;
        if (!account_name || !branch || !amount || !date) {
            return res.status(400).json({ message: "All required fields must be provided, including the date" });
        }
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const seller = new Seller({ account_name, branch, amount, description, date: formattedDate });
        await seller.save();
        
        res.status(201).json(seller);
    } catch (error) {
        next(error);
    }
};



const updateSeller = async (req, res, next) => {
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSeller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        res.status(200).json(updatedSeller);
    } catch (error) {
        next(error);
    }
};


const deleteSeller = async (req, res, next) => {
    try {
        const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
        if (!deletedSeller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSellers, addSeller, updateSeller, deleteSeller };
