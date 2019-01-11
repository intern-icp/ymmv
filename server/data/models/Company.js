const mongoose = require('mongoose');
const CompanyContract = require('../contracts/Company');

const CompanySchema = new mongoose.Schema(CompanyContract);

module.exports = mongoose.model('Company', CompanySchema);