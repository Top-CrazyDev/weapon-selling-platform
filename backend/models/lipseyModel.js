const mongoose = require("mongoose");

const lipseySchema = new mongoose.Schema({
    itemNo: {
        type: String
    },
    description1: {
        type: String
    },
    description2: {
        type: String
    },
    upc: {
        type: String
    },
    manufacturerModelNo: {
        type: String
    },
    msrp: {
        type: String
    },
    model: {
        type: String
    },
    caliberGauge: {
        type: String
    },
    manufacturer: {
        type: String
    },
    type: {
        type: String
    },
    action: {
        type: String
    },
    barrelLength: {
        type: String
    },
    capacity: {
        type: String
    },
    finish: {
        type: String
    },
    overallLength: {
        type: String
    },
    receiver: {
        type: String
    },
    safety: {
        type: String
    },
    sights: {
        type: String
    },
    stockFrameGrips: {
        type: String
    },
    magazine: {
        type: String
    },
    weight: {
        type: String
    },
    imageName: {
        type: String
    },
    chamber: {
        type: String
    },
    drilledAndTapped: {
        type: String
    },
    rateOfTwist: {
        type: String
    },
    itemType: {
        type: String
    },
    additionalFeature1: {
        type: String
    },
    additionalFeature2: {
        type: String
    },
    additionalFeature3: {
        type: String
    },
    shippingWeight: {
        type: String
    },
    boundBookManufacturer: {
        type: String
    },
    boundBookModel: {
        type: String
    },
    boundBookType: {
        type: String
    },
    nfaThreadPattern: {
        type: String
    },
    nfaAttachmentMethod: {
        type: String
    },
    nfaBaffleType: {
        type: String
    },
    silencerCanBeDisassembled: {
        type: String
    },
    silencerConstructionMaterial: {
        type: String
    },
    nfaDbReduction: {
        type: String
    },
    silencerOutsideDiameter: {
        type: String
    },
    nfaForm3Caliber: {
        type: String
    },
    opticMagnification: {
        type: String
    },
    maintubeSize: {
        type: String
    },
    adjustableObjective: {
        type: String
    },
    objectiveSize: {
        type: String
    },
    opticAdjustments: {
        type: String
    },
    illuminatedReticle: {
        type: String
    },
    reticle: {
        type: String
    },
    exclusive: {
        type: String
    },
    quantity: {
        type: String
    },
    allocated: {
        type: String
    },
    onSale: {
        type: String
    },
    price: {
        type: String
    },
    currentPrice: {
        type: String
    },
    retailMap: {
        type: String
    },
    fflRequired: {
        type: String
    },
    sotRequired: {
        type: String
    },
    exclusiveType: {
        type: String
    },
    scopeCoverIncluded: {
        type: String
    },
    special: {
        type: String
    },
    sightsType: {
        type: String
    },
    case: {
        type: String
    },
    choke: {
        type: String
    },
    dbReduction: {
        type: String
    },
    family: {
        type: String
    },
    finishType: {
        type: String
    },
    frame: {
        type: String
    },
    gripType: {
        type: String
    },
    handgunSlideMaterial: {
        type: String
    },
    countryOfOrigin: {
        type: String
    },
    itemLength: {
        type: String
    },
    itemWidth: {
        type: String
    },
    itemHeight: {
        type: String
    },
    packageLength: {
        type: String
    },
    packageWidth: {
        type: String
    },
    packageHeight: {
        type: String
    },
    itemGroup: {
        type: String
    },
    featured: {
        type: String
    },
    isDuplicateWithZander: {
        type: Boolean,
        default: false
    }
})

module.exports = Lipsey = mongoose.model("lipsey", lipseySchema);