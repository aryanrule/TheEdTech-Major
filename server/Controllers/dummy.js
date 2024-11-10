// In ../Controllers/dummy.
const dummy = require('../Models/dummy');

const dummyHandler = async (req, res) => {
    try {
        const { name, work } = req.body;
        const update = await dummy.create({ name, work });
        return res.status(200).json({
            success: true,
            message: "Entry created successfully",
            update,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the entry",
            error: e.message,
        });
    }
};

// Export the handler function
module.exports = dummyHandler;
