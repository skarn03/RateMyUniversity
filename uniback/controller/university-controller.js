const University = require('../Model/University-model');

class UniversityController {
    static getUniversitiesByKeyword = async (req, res) => {
        console.log("here");
        try {
            const keyword = req.body.keyword;

            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required in the request body.' });
            }

            // Perform a case-insensitive search for up to 5 universities that match the keyword
            const universities = await University.find({
                name: { $regex: new RegExp(keyword, 'i') }
            }).limit(5);

            return res.status(200).json({ universities });
        } catch (error) {
            console.error('Error fetching universities:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UniversityController;
