import { gql } from 'apollo-boost';

export default gql`
  fragment AdminPermission on AdminPermission {
    _id
  
    manageAssignPermissions
    viewAdminPermissions
    adminTools
    adminPanel
    adminMute
    adminKick
    adminTemporaryBan
    adminPermanentBan
    adminKillFade
    adminFreeze
    adminSpectate
    adminTeleport
    adminHealSelf
    adminGodlike
    adminJoinFactions
    adminAnnouncements
    adminPolls
    adminShips
    adminGold
    adminItems
    adminAllItems
    adminFactions
    adminAnimals
  }
`;
