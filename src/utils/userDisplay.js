function pickFirstString(...values) {
  for (const value of values) {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.length) {
        return trimmed;
      }
    }
  }
  return null;
}

export function getUserDisplay(user) {
  if (!user) {
    return null;
  }

  const { user_metadata, email, identities } = user;
  const identityData =
    identities?.find((identity) => identity?.identity_data)?.identity_data ??
    null;

  const avatarUrl = pickFirstString(
    user_metadata?.avatar_url,
    identityData?.avatar_url,
    identityData?.picture,
    identityData?.profile_image_url,
  );

  const initial =
    pickFirstString(
      user_metadata?.full_name,
      user_metadata?.name,
      identityData?.full_name,
      identityData?.name,
      email,
    )?.[0]?.toUpperCase() ?? null;

  if (!avatarUrl && !initial) {
    return null;
  }

  return { avatarUrl, initial };
}
