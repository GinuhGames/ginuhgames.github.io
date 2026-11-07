import type { IconType } from 'react-icons';
import {
  FaDiscord,
  FaInstagram,
  FaKickstarterK,
  FaLinkedinIn,
  FaSteam,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import type { SocialId } from '../content/site';

export const socialIcons: Record<SocialId, IconType> = {
  steam: FaSteam,
  discord: FaDiscord,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  kickstarter: FaKickstarterK,
};

export const socialLabels: Record<SocialId, string> = {
  steam: 'Steam',
  discord: 'Discord',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  x: 'X',
  linkedin: 'LinkedIn',
  kickstarter: 'Kickstarter',
};
