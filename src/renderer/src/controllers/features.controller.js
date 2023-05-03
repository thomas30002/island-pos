const FEATURES_KEY = 'ipos-features';

export const getFeatures = () => {
    const featuresStr = localStorage.getItem(FEATURES_KEY);
    return JSON.parse(featuresStr);
}

export const saveFeatures = ({posTapSound = true, diningOptions = false}) => {
    localStorage.setItem(FEATURES_KEY, JSON.stringify({posTapSound, diningOptions}));
}