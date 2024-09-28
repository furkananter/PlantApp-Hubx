import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

// Get user tracking permission
// This function is important for compliance with privacy regulations
// Dont remove it , because Apple will reject the app if this is not implemented
export const getUserTrackingPermission = async () => {
  const { status } = await requestTrackingPermissionsAsync();
  if (status === 'granted') {
    return true;
  } else {
    return false;
  }
};

export const formatCategoryName = (name: string): string[] => {
  const parts = name.split(/[-\s]+/);
  const firstPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

  if (parts.length === 1) return [firstPart];
  if (parts[1].toLowerCase() === 'and' && parts.length > 2) {
    return [
      `${firstPart} ${parts[1]}`,
      parts[2].charAt(0).toUpperCase() + parts[2].slice(1),
    ];
  }
  return [firstPart, parts[1].charAt(0).toUpperCase() + parts[1].slice(1)];
};
