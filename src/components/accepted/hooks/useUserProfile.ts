import info from "../../../data/info.json";

export function useUserProfile(userEmail: string | null | undefined) {
  const profiles = Object.values(info.profiles);

  const userProfile = userEmail
    ? profiles.find((profile) => profile.email === userEmail)
    : profiles.length > 0
      ? profiles[profiles.length - 1]
      : null;

  const displayName = (userProfile as any)?.fullName || userEmail || "Guest";

  return { userProfile, displayName };
}
