const FEATURES_KEY = 'ipos-features';

exports.getFeatures = () => {
    const featuresStr = localStorage.getItem(FEATURES_KEY);
    return JSON.parse(featuresStr);
}

exports.saveFeatures = ({posTapSound = true, diningOptions = false}) => {
    localStorage.setItem(FEATURES_KEY, JSON.stringify({posTapSound, diningOptions}));
}