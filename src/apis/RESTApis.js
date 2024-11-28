const pathForHomeApi = '/api';

const pathForBeneficiaryOps = {
    addBeneficiary: `${pathForHomeApi}/addBeneficiary`,
    editBeneficiary: `${pathForHomeApi}/editBeneficiary`,
    getBeneficiaries: `${pathForHomeApi}/getBeneficiaries`,
    deleteBeneficiary: `${pathForHomeApi}/deleteBeneficiary`
}

module.exports = {
    pathForBeneficiaryOps
}