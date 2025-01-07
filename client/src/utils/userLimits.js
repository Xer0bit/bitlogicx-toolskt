export const USER_LIMITS = {
  GUEST: {
    maxDailyUses: 3,
    maxFileSize: 5, // in MB
    features: ['basic'],
  },
  FREE: {
    maxDailyUses: 10,
    maxFileSize: 10,
    features: ['basic', 'advanced'],
  },
  PREMIUM: {
    maxDailyUses: Infinity,
    maxFileSize: 50,
    features: ['basic', 'advanced', 'premium'],
  },
};

export const checkUserLimit = (user, action) => {
  const userType = user?.subscription || 'GUEST';
  const limits = USER_LIMITS[userType];

  // Check if user has reached their daily limit
  if (action.usageCount >= limits.maxDailyUses) {
    return {
      allowed: false,
      message: 'Daily usage limit reached. Please upgrade your account.',
    };
  }

  // Check file size limit if applicable
  if (action.fileSize && action.fileSize > limits.maxFileSize * 1024 * 1024) {
    return {
      allowed: false,
      message: `File size exceeds the ${limits.maxFileSize}MB limit for your account type.`,
    };
  }

  // Check if feature is available for user's subscription
  if (action.feature && !limits.features.includes(action.feature)) {
    return {
      allowed: false,
      message: 'This feature is not available in your current plan.',
    };
  }

  return { allowed: true };
};
